'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'

const FilePreview = dynamic(() => import('@/components/FilePreview'), {
  ssr: false
})

interface SearchResult {
  file: {
    name: string;
    path: string;
  };
  matches: string[];
}

// 添加 useDebounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFullTextSearch, setIsFullTextSearch] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [previewFile, setPreviewFile] = useState<{ name: string; path: string } | null>(null)

  // 使用防抖的搜索词
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // 将搜索逻辑移到 useEffect 中，监听防抖后的搜索词
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedSearchQuery)}&fullText=${isFullTextSearch}`)
        const data = await response.json()
        setSearchResults(data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [debouncedSearchQuery, isFullTextSearch])

  // 更新 handleSearch 函数
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const highlightText = (text: string) => {
    if (!searchQuery) return text
    const regex = new RegExp(`(${searchQuery})`, 'gi')
    return text.split(regex).map((part, i) => 
      regex.test(part) ? 
        <span key={i} className="bg-yellow-200">{part}</span> : 
        part
    )
  }

  const handlePreview = (file: { name: string; path: string }) => {
    setPreviewFile(file)
  }

  return (
    <>
      <div className="relative">
        <Input 
          className="w-[300px] bg-[#2C3E5D] border-0 text-white placeholder:text-gray-400"
          placeholder="搜索..." 
          type="search"
          onFocus={() => setIsOpen(true)}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FontAwesomeIcon 
          icon={faSearch} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[50vw] h-[90vh] p-0 overflow-y-scroll max-w-[100%]!">

          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex-1">
                <Input
                  className="w-full"
                  placeholder="搜索..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fullTextSearch"
                    checked={isFullTextSearch}
                    onCheckedChange={(checked) => {
                      setIsFullTextSearch(checked as boolean)
                      if (searchQuery) {
                        handleSearch(searchQuery)
                      }
                    }}
                  />
                  <Label htmlFor="fullTextSearch">全文检索</Label>
                </div>
                <DialogClose asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    {/* <FontAwesomeIcon icon={faTimes} className="h-5 w-5 text-gray-500" /> */}
                  </button>
                </DialogClose>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-blue-600 flex items-center break-all">
                          <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                          {result.file.name}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(result.file)}
                        >
                          预览
                        </Button>
                      </div>
                      {result.matches.length > 0 && (
                        <div className="max-h-32 overflow-auto bg-gray-50 rounded p-2 mt-2">
                          {result.matches.map((match, matchIndex) => (
                            <pre key={matchIndex} className="text-sm text-gray-600 whitespace-pre-wrap break-all">
                              {highlightText(match)}
                            </pre>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  未找到相关结果
                </div>
              ) : null}
            </div>
          </div>
           {previewFile && (
        <FilePreview
          file={{
            name: previewFile.name,
            type: getFileType(previewFile.name),
            previewUrl: previewFile.path,
          }}
          onClose={() => setPreviewFile(null)}
        />
      )}
        </DialogContent>
      </Dialog>

     
    </>
  )
}

function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (!ext) return 'document'
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) return 'image'
  if (["mp4", "webm", "ogg", "mov", "avi"].includes(ext)) return 'video'
  if (["pdf"].includes(ext)) return 'pdf'
  if (["xlsx", "xls", "csv"].includes(ext)) return 'excel'
  if (["docx", "doc"].includes(ext)) return 'docx'
  return 'document'
} 