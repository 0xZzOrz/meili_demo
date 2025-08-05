'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFile,
  faFileWord,
  faFileExcel,
  faFilePdf,
  faFileImage,
  faFilePowerpoint,
  faThLarge,
  faList,
  faSearch,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  faFolderOpen,
  faLink,
  faEdit,
  faPaperPlane,
  faFont,
  faEye,
  faDownload,
  faBookmark,
  faCopy,
  faArrowRight,
  faPlus,
  faArchive,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

interface Document {
  id: string
  name: string
  type: 'doc' | 'xls' | 'pdf' | 'img' | 'ppt' | 'other'
  createdAt: string
  createdBy: string
  size: string
  spaceId: string
  folderId?: string
  lastModified: string
  tags: string[]
  description?: string
  version: string
  status: 'draft' | 'review' | 'published'
}

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    name: '项目需求文档.docx',
    type: 'doc',
    createdAt: '2024-03-15 10:30',
    createdBy: '张三',
    size: '2.5MB',
    spaceId: 'space1',
    folderId: 'folder1',
    lastModified: '2024-03-15 14:20',
    tags: ['需求', '产品'],
    description: '项目需求规格说明书',
    version: '1.0.0',
    status: 'published'
  },
  {
    id: 'doc2',
    name: '项目进度表.xlsx',
    type: 'xls',
    createdAt: '2024-03-14 15:20',
    createdBy: '李四',
    size: '1.8MB',
    spaceId: 'space1',
    folderId: 'folder2',
    lastModified: '2024-03-14 16:30',
    tags: ['进度', '项目管理'],
    description: '项目进度跟踪表',
    version: '1.0.0',
    status: 'review'
  },
  {
    id: 'doc3',
    name: '设计规范.pdf',
    type: 'pdf',
    createdAt: '2024-03-13 09:45',
    createdBy: '王五',
    size: '5.2MB',
    spaceId: 'space1',
    folderId: 'folder1-1',
    lastModified: '2024-03-13 11:15',
    tags: ['设计', '规范'],
    description: 'UI设计规范文档',
    version: '1.0.0',
    status: 'published'
  },
  {
    id: 'doc4',
    name: '产品原型.png',
    type: 'img',
    createdAt: '2024-03-12 16:10',
    createdBy: '赵六',
    size: '3.1MB',
    spaceId: 'space1',
    folderId: 'folder1-2',
    lastModified: '2024-03-12 17:45',
    tags: ['原型', '设计'],
    description: '产品高保真原型图',
    version: '1.0.0',
    status: 'published'
  },
  {
    id: 'doc5',
    name: '项目汇报.pptx',
    type: 'ppt',
    createdAt: '2024-03-11 14:30',
    createdBy: '钱七',
    size: '4.5MB',
    spaceId: 'space2',
    folderId: 'folder3',
    lastModified: '2024-03-11 16:20',
    tags: ['汇报', '项目'],
    description: '项目周会汇报材料',
    version: '1.0.0',
    status: 'draft'
  },
  {
    id: 'doc6',
    name: '技术方案.txt',
    type: 'other',
    createdAt: '2024-03-10 11:20',
    createdBy: '孙八',
    size: '0.5MB',
    spaceId: 'space2',
    folderId: 'folder4',
    lastModified: '2024-03-10 13:40',
    tags: ['技术', '方案'],
    description: '系统架构设计方案',
    version: '1.0.0',
    status: 'review'
  },
  {
    id: 'doc7',
    name: '个人笔记.docx',
    type: 'doc',
    createdAt: '2024-03-09 09:15',
    createdBy: '张三',
    size: '1.2MB',
    spaceId: 'space3',
    lastModified: '2024-03-09 10:30',
    tags: ['笔记', '个人'],
    description: '个人工作笔记',
    version: '1.0.0',
    status: 'draft'
  }
]

interface DocumentListProps {
  viewMode: 'card' | 'list'
  onViewModeChange: (mode: 'card' | 'list') => void
  selectedSpace: string
  selectedFolder?: string
}

type SortField = 'name' | 'createdAt' | 'lastModified' | 'size'
type SortOrder = 'asc' | 'desc'

export function DocumentList({ viewMode, onViewModeChange, selectedSpace, selectedFolder }: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'doc':
        return faFileWord
      case 'xls':
        return faFileExcel
      case 'pdf':
        return faFilePdf
      case 'img':
        return faFileImage
      case 'ppt':
        return faFilePowerpoint
      default:
        return faFile
    }
  }

  const getFileColor = (type: Document['type']) => {
    switch (type) {
      case 'doc':
        return 'text-blue-500'
      case 'xls':
        return 'text-green-500'
      case 'pdf':
        return 'text-red-500'
      case 'img':
        return 'text-purple-500'
      case 'ppt':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-600'
      case 'review':
        return 'bg-yellow-100 text-yellow-600'
      case 'published':
        return 'bg-green-100 text-green-600'
    }
  }

  const getFilteredDocuments = () => {
    let filtered = mockDocuments

    // 空间过滤
    if (selectedSpace !== 'all') {
      filtered = filtered.filter(doc => doc.spaceId === selectedSpace)
    }

    // 文件夹过滤
    if (selectedFolder) {
      filtered = filtered.filter(doc => doc.folderId === selectedFolder)
    }

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.description?.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 排序
    filtered.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1
      switch (sortField) {
        case 'name':
          return multiplier * a.name.localeCompare(b.name)
        case 'createdAt':
          return multiplier * new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'lastModified':
          return multiplier * new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
        case 'size':
          return multiplier * (parseFloat(a.size) - parseFloat(b.size))
        default:
          return 0
      }
    })

    return filtered
  }

  const documents = getFilteredDocuments()

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {selectedSpace === 'all' ? '全部文档' : `空间文档 (${documents.length})`}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'card' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => onViewModeChange('card')}
          >
            <FontAwesomeIcon icon={faThLarge} className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => onViewModeChange('list')}
          >
            <FontAwesomeIcon icon={faList} className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="搜索文档..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortField} onValueChange={(value: SortField) => setSortField(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="排序方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">名称</SelectItem>
            <SelectItem value="createdAt">创建时间</SelectItem>
            <SelectItem value="lastModified">修改时间</SelectItem>
            <SelectItem value="size">文件大小</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={toggleSortOrder}>
          <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-4 p-1 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faFolderOpen} className="h-4 w-4 mr-1" />
              打开
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faLink} className="h-4 w-4 mr-1" />
              复制链接
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faEdit} className="h-4 w-4 mr-1" />
              编辑
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 mr-1" />
              发送到
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faFont} className="h-4 w-4 mr-1" />
              重命名
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faEye} className="h-4 w-4 mr-1" />
              查看权限
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faDownload} className="h-4 w-4 mr-1" />
              下载
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faBookmark} className="h-4 w-4 mr-1" />
              保留
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faCopy} className="h-4 w-4 mr-1" />
              复制
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 mr-1" />
              移动
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-1" />
              添加版本
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <FontAwesomeIcon icon={faArchive} className="h-4 w-4 mr-1" />
              收集
            </Button>
            <Button variant="outline" size="sm" className="text-sm text-red-600 hover:text-red-700">
              <FontAwesomeIcon icon={faTrash} className="h-4 w-4 mr-1" />
              删除
            </Button>
          </div>
        </div>
      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <FontAwesomeIcon icon={faFile} className="h-12 w-12 mb-4" />
          <p>当前空间暂无文档</p>
        </div>
      ) : viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map(doc => (
            <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gray-50 ${getFileColor(doc.type)}`}>
                  <FontAwesomeIcon icon={getFileIcon(doc.type)} className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{doc.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status === 'draft' ? '草稿' : doc.status === 'review' ? '审核中' : '已发布'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {doc.createdBy} · {doc.createdAt}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{doc.size}</p>
                  {doc.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{doc.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {documents.map(doc => (
            <Card key={doc.id} className="p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${getFileColor(doc.type)}`}>
                  <FontAwesomeIcon icon={getFileIcon(doc.type)} className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{doc.name}</h3>
                    <div className="flex items-center space-x-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status === 'draft' ? '草稿' : doc.status === 'review' ? '审核中' : '已发布'}
                      </span>
                      <div className="text-sm text-gray-500">{doc.size}</div>
                    </div>
                  </div>
                  {doc.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{doc.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="text-sm text-gray-500">{doc.createdBy}</div>
                    <div className="text-sm text-gray-500">{doc.lastModified}</div>
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 