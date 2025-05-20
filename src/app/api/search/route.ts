import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { glob } from 'glob'
import mammoth from 'mammoth'
import * as xlsx from 'xlsx'
import pdfParse from 'pdf-parse'

const MAX_MATCH_LENGTH = 200

// 过滤 xml/html 标签和不可见字符，只保留可读文本
function cleanText(raw: string) {
  // 去除 xml/html 标签
  let text = raw.replace(/<[^>]+>/g, '')
  // 去除不可见字符
  text = text.replace(/[\x00-\x1F\x7F-\x9F]+/g, ' ')
  // 去除多余空格
  text = text.replace(/\s{2,}/g, ' ').trim()
  return text
}

async function extractText(filePath: string, ext: string): Promise<string> {
  try {
    if (ext === '.docx') {
      const buffer = await fs.readFile(filePath)
      const result = await mammoth.extractRawText({ buffer })
      return result.value
    } else if (ext === '.xlsx') {
      const buffer = await fs.readFile(filePath)
      const workbook = xlsx.read(buffer, { type: 'buffer' })
      return workbook.SheetNames.map(name => xlsx.utils.sheet_to_csv(workbook.Sheets[name])).join('\n')
    } else if (ext === '.pdf') {
      const buffer = await fs.readFile(filePath)
      const data = await pdfParse(buffer)
      return data.text
    } else {
      // 其他文件尝试按 utf-8 文本读取
      return await fs.readFile(filePath, 'utf-8')
    }
  } catch (e) {
    // 兜底：尝试 buffer 读取转字符串
    try {
      const buffer = await fs.readFile(filePath)
      return buffer.toString('utf-8')
    } catch (e2) {
      return ''
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const fullText = searchParams.get('fullText') === 'true'

  if (!query) {
    return NextResponse.json([])
  }

  try {
    // 搜索 /public/preview 目录下的所有文件
    const files = await glob('**/*', {
      cwd: path.join(process.cwd(), 'public', 'preview'),
      nodir: true,
    })

    const results = []

    for (const file of files) {
      const filePath = path.join(process.cwd(), 'public', 'preview', file)
      const ext = path.extname(file).toLowerCase()
      if (fullText) {
        // 所有文件都做全文检索，优先用解析器
        const content = await extractText(filePath, ext)
        const lines = content.split('\n')
        const matches = lines
          .filter(line => line.toLowerCase().includes(query.toLowerCase()))
          .map(line => {
            const cleaned = cleanText(line)
            return cleaned.length > MAX_MATCH_LENGTH ? cleaned.slice(0, MAX_MATCH_LENGTH) + '...' : cleaned
          })
          .filter(line => line.length > 0)
        if (matches.length > 0) {
          results.push({
            file: {
              name: file,
              path: `/preview/${file}`,
            },
            matches,
          })
        }
      } else {
        // 文件名检索，所有文件都支持
        if (file.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            file: {
              name: file,
              path: `/preview/${file}`,
            },
            matches: [],
          })
        }
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: '搜索失败' }, { status: 500 })
  }
} 