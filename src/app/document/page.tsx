'use client'

import { useState } from 'react'
import { DocumentList } from '@/components/modules/document/document-list'
import { SpaceSelector } from '@/components/modules/document/space-selector'


export default function DocumentPage() {
  const [selectedSpace, setSelectedSpace] = useState('all')
  const [selectedFolder, setSelectedFolder] = useState<string>()
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')

  const handleSpaceSelect = (spaceId: string, folderId?: string) => {
    setSelectedSpace(spaceId)
    setSelectedFolder(folderId)
  }

  return (
    <div className="flex h-full">
      <div className="w-64 border-r p-4">
        <SpaceSelector 
          selectedSpace={selectedSpace}
          selectedFolder={selectedFolder}
          onSpaceSelect={handleSpaceSelect}
        />
      </div>
      <div className="flex-1 p-4">
        {/* 工具栏按钮 */}

        
        <DocumentList 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedSpace={selectedSpace}
          selectedFolder={selectedFolder}
        />
      </div>
    </div>
  )
} 