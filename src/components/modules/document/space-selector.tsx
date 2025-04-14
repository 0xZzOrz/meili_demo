'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFolder, 
  faFolderOpen,
  faChevronRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'

interface Space {
  id: string
  name: string
  type: 'space' | 'folder'
  children?: Space[]
}

const mockSpaces: Space[] = [
  {
    id: 'space1',
    name: '项目文档',
    type: 'space',
    children: [
      {
        id: 'folder1',
        name: '需求文档',
        type: 'folder',
        children: [
          {
            id: 'folder1-1',
            name: 'PRD',
            type: 'folder'
          },
          {
            id: 'folder1-2',
            name: '原型设计',
            type: 'folder'
          }
        ]
      },
      {
        id: 'folder2',
        name: '技术文档',
        type: 'folder'
      }
    ]
  },
  {
    id: 'space2',
    name: '团队文档',
    type: 'space',
    children: [
      {
        id: 'folder3',
        name: '会议记录',
        type: 'folder'
      },
      {
        id: 'folder4',
        name: '周报',
        type: 'folder'
      }
    ]
  },
  {
    id: 'space3',
    name: '个人文档',
    type: 'space'
  }
]

interface SpaceSelectorProps {
  selectedSpace: string
  selectedFolder?: string
  onSpaceSelect: (spaceId: string, folderId?: string) => void
}

export function SpaceSelector({ selectedSpace, selectedFolder, onSpaceSelect }: SpaceSelectorProps) {
  const [expandedSpaces, setExpandedSpaces] = useState<Set<string>>(new Set(['space1']))

  const toggleSpace = (spaceId: string) => {
    const newExpanded = new Set(expandedSpaces)
    if (newExpanded.has(spaceId)) {
      newExpanded.delete(spaceId)
    } else {
      newExpanded.add(spaceId)
    }
    setExpandedSpaces(newExpanded)
  }

  const handleSelect = (spaceId: string, folderId?: string) => {
    onSpaceSelect(spaceId, folderId)
  }

  const renderSpace = (space: Space, level: number = 0) => {
    const isExpanded = expandedSpaces.has(space.id)
    const isSelected = selectedSpace === space.id || selectedFolder === space.id
    const hasChildren = space.children && space.children.length > 0

    return (
      <div key={space.id}>
        <div 
          className={`flex items-center space-x-2 py-2 px-3 rounded-md cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleSpace(space.id)
            } else {
              handleSelect(space.type === 'space' ? space.id : selectedSpace, space.id)
            }
          }}
        >
          {hasChildren && (
            <FontAwesomeIcon 
              icon={isExpanded ? faChevronDown : faChevronRight} 
              className="h-3 w-3 text-gray-400 transition-transform duration-200"
            />
          )}
          <FontAwesomeIcon 
            icon={isExpanded ? faFolderOpen : faFolder} 
            className={`h-4 w-4 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}
          />
          <span className="text-sm font-medium">{space.name}</span>
        </div>
        {isExpanded && hasChildren && (
          <div className="ml-4 border-l border-gray-200">
            {space.children?.map(child => renderSpace(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div 
        className={`flex items-center space-x-2 py-2 px-3 rounded-md cursor-pointer transition-colors ${
          selectedSpace === 'all' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
        }`}
        onClick={() => handleSelect('all')}
      >
        <FontAwesomeIcon 
          icon={faFolder} 
          className={`h-4 w-4 ${selectedSpace === 'all' ? 'text-blue-500' : 'text-gray-400'}`}
        />
        <span className="text-sm font-medium">全部文档</span>
      </div>
      <div className="mt-2">
        {mockSpaces.map(space => renderSpace(space))}
      </div>
    </div>
  )
} 