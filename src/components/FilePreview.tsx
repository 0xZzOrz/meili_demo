'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import jsPreviewDocx from '@js-preview/docx'
import jsPreviewExcel from '@js-preview/excel'
import JsPdfPreview from '@js-preview/pdf'
import '@js-preview/docx/lib/index.css'
import '@js-preview/excel/lib/index.css'

interface FilePreviewProps {
  file: {
    name: string;
    type: string;
    previewUrl: string;
  };
  onClose: () => void;
}

export default function FilePreview({ file, onClose }: FilePreviewProps) {
  const [visible, setVisible] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const previewerRef = useRef<any>(null)
  const currentFileRef = useRef<string>('')
  const [mounted, setMounted] = useState(false)
  const [previewType, setPreviewType] = useState<'document' | 'image' | 'video'>('document')

  useEffect(() => {
    setMounted(true)
    // 根据文件类型设置预览类型
    if (file.type === 'image' || file.type === 'img') {
      setPreviewType('image')
      setVisible(true)
    } else if (file.type === 'video') {
      setPreviewType('video')
      setVisible(true)
    } else {
      setPreviewType('document')
    }
  }, [file.type])

  useEffect(() => {
    if (!mounted) return

    const initPreviewer = async () => {
      if (!previewRef.current) return
      
      // 如果当前文件与上次预览的文件相同，则不重新初始化
      if (currentFileRef.current === file.previewUrl) {
        return
      }
      
      currentFileRef.current = file.previewUrl

      try {
        if (previewType === 'document') {
          const fileUrl = `${file.previewUrl}`
          const response = await fetch(fileUrl)
          const blob = await response.blob()
          const fileBuffer = await blob.arrayBuffer()

          let previewer

          // 如果已经存在预览器，先销毁它
          if (previewerRef.current) {
            previewerRef.current.destroy?.()
          }

          switch (file.type) {
            case 'pdf':
              previewer = JsPdfPreview.init(previewRef.current)
              break
            case 'excel':
              previewer = jsPreviewExcel.init(previewRef.current)
              break
            case 'docx':
              previewer = jsPreviewDocx.init(previewRef.current)
              break
            default:
              return
          }

          previewerRef.current = previewer
          await previewer.preview(fileBuffer)
          setVisible(true)
        }
      } catch (error) {
        console.error('预览初始化错误:', error)
      }
    }

    initPreviewer()

    return () => {
      if (previewerRef.current) {
        previewerRef.current.destroy?.()
      }
    }
  }, [file.previewUrl, file.type, mounted, previewType])

  if (!mounted) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999999999999999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{file.name}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>
        <div className="border rounded-lg p-4">
          {previewType === 'image' ? (
            <div className="flex items-center justify-center h-[70vh]">
              <img 
                src={file.previewUrl} 
                alt={file.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : previewType === 'video' ? (
            <div className="flex items-center justify-center h-[70vh]">
              <video 
                src={file.previewUrl}
                controls
                className="max-h-full max-w-full"
              >
                您的浏览器不支持视频播放
              </video>
            </div>
          ) : (
            <div 
              ref={previewRef} 
              className={`w-full h-[70vh] overflow-auto ${visible ? 'block' : 'hidden'}`}
            />
          )}
        </div>
      </div>
    </div>
  )
} 