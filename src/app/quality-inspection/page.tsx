'use client'

import { Card } from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFlask,
  faGears,
  faBoxOpen,
  faRuler,
  faVial,
  faTruck,
  faFile,
  faFileAlt,
  faFileImage,
  faFileVideo,
  faChevronRight,
  faCheck,
  faFan,
  faInfoCircle,
  faLayerGroup,
  faTimes,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from 'next/dynamic'

const FilePreview = dynamic(() => import('@/components/FilePreview'), {
  ssr: false
})

// 模拟风扇产品数据
const fans = [
  {
    id: 'fan1',
    name: 'AX-2000系列风扇',
    model: 'AX-2023',
    size: '200mm',
    material: '碳纤维复合材料',
    application: '工业冷却',
    description: '高性能工业冷却风扇，采用先进复合材料制造',
    image: '/images/AX2000.jpg',
    blades: [
      { id: 'blade1', name: '叶片A', status: 2 },
      { id: 'blade2', name: '叶片B', status: 4 },
      { id: 'blade3', name: '叶片C', status: 1 },
    ]
  },
  {
    id: 'fan2',
    name: 'BX-3000系列风扇',
    model: 'BX-3025',
    size: '300mm',
    material: '钛合金材料',
    application: '航空领域',
    description: '航空级别高强度风扇，采用特种钛合金制造',
    image: '/images/BX3000.jpg',
    blades: [
      { id: 'blade4', name: '叶片D', status: 3 },
      { id: 'blade5', name: '叶片E', status: 5 },
      { id: 'blade6', name: '叶片F', status: 0 },
    ]
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: "easeOut"
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

const stages = [
  {
    title: '原材料检测',
    icon: faFlask,
    color: 'bg-blue-100 text-blue-500',
    borderColor: 'border-blue-500',
    lightColor: 'bg-blue-50',
    files: [
      { 
        name: '纤维材料检验报告.pdf', 
        icon: faFileAlt,
        type: 'pdf',
        previewUrl: '/preview/fiber-report.pdf'
      },
      { 
        name: '芯材检验报告.xlsx', 
        icon: faFileAlt,
        type: 'excel',
        previewUrl: '/preview/core-report.xlsx'
      },
      { 
        name: '胶粘剂与涂层检验报告.docx', 
        icon: faFileAlt,
        type: 'docx',
        previewUrl: '/preview/adhesive-report.docx'
      },
      { 
        name: '材料外观照片.jpg', 
        icon: faFileImage,
        type: 'image',
        previewUrl: 'https://picsum.photos/800/600'
      }
    ]
  },
  {
    title: '生产过程检验',
    icon: faGears,
    color: 'bg-green-100 text-green-500',
    borderColor: 'border-green-500',
    lightColor: 'bg-green-50',
    files: [
      { 
        name: 'XX工艺检验报告.pdf', 
        icon: faFileAlt,
        type: 'pdf',
        previewUrl: '/preview/process-report.pdf'
      },
      { 
        name: '检验视频.mov', 
        icon: faFileVideo,
        type: 'video',
        previewUrl: '/preview/inspection-video.mov'
      },
      { 
        name: '不合格品图片.jpg', 
        icon: faFileImage,
        type: 'image',
        previewUrl: 'https://picsum.photos/800/600?random=1'
      },
      { 
        name: '生产现场照片.jpg', 
        icon: faFileImage,
        type: 'image',
        previewUrl: 'https://picsum.photos/800/600?random=2'
      }
    ]
  },
  {
    title: '后处理与组装检验',
    icon: faBoxOpen,
    color: 'bg-yellow-100 text-yellow-500',
    borderColor: 'border-yellow-500',
    lightColor: 'bg-yellow-50',
    files: [
      { 
        name: '组装工艺检验报告.docx', 
        icon: faFileAlt,
        type: 'docx',
        previewUrl: '/preview/assembly-report.docx'
      },
      { 
        name: '干膜厚度检测报告.xlsx', 
        icon: faFileAlt,
        type: 'excel',
        previewUrl: '/preview/thickness-report.xlsx'
      },
      { 
        name: '导电通路电阻测试报告.pdf', 
        icon: faFileAlt,
        type: 'pdf',
        previewUrl: '/preview/resistance-report.pdf'
      },
      { 
        name: '组装过程照片.jpg', 
        icon: faFileImage,
        type: 'image',
        previewUrl: 'https://picsum.photos/800/600?random=3'
      }
    ]
  },
  {
    title: '成品全尺寸检验',
    icon: faRuler,
    color: 'bg-purple-100 text-purple-500',
    borderColor: 'border-purple-500',
    lightColor: 'bg-purple-50',
    files: [
      { 
        name: '产品尺寸检验报告.pdf', 
        icon: faFileAlt,
        type: 'pdf',
        previewUrl: '/preview/dimension-report.pdf'
      },
      { 
        name: '动平衡测试报告.xlsx', 
        icon: faFileAlt,
        type: 'excel',
        previewUrl: '/preview/balance-report.xlsx'
      },
      { 
        name: '疲劳试验报告.docx', 
        icon: faFileAlt,
        type: 'docx',
        previewUrl: '/preview/fatigue-report.docx'
      },
      { 
        name: '成品照片.jpg', 
        icon: faFileImage,
        type: 'image',
        previewUrl: 'https://picsum.photos/800/600?random=4'
      }
    ]
  },
  {
    title: '非破坏性检测',
    icon: faVial,
    color: 'bg-indigo-100 text-indigo-500',
    borderColor: 'border-indigo-500',
    lightColor: 'bg-indigo-50',
    files: [
      { 
        name: '胶接缺陷检测报告.pdf', 
        icon: faFileAlt,
        type: 'pdf',
        previewUrl: '/preview/bonding-report.pdf'
      },
      { 
        name: '内部脱粘检测报告.xlsx', 
        icon: faFileAlt,
        type: 'excel',
        previewUrl: '/preview/delamination-report.xlsx'
      },
      { 
        name: '检测过程照片.jpg', 
        icon: faFileImage,
        type: 'image',
        previewUrl: 'https://picsum.photos/800/600?random=5'
      }
    ]
  },
  {
    title: '出厂检验',
    icon: faTruck,
    color: 'bg-red-100 text-red-500',
    borderColor: 'border-red-500',
    lightColor: 'bg-red-50',
    files: [
      { 
        name: '产品出厂检验报告.docx', 
        icon: faFileAlt,
        type: 'docx',
        previewUrl: '/preview/final-report.docx'
      },
      { 
        name: '包装照片.jpg', 
        icon: faFileImage,
        type: 'image',
        previewUrl: 'https://picsum.photos/800/600?random=6'
      }
    ]
  }
]

export default function QualityInspection() {
  const [selectedFan, setSelectedFan] = useState(fans[0])
  const [selectedBlade, setSelectedBlade] = useState(fans[0].blades[0])
  const [selectedStage, setSelectedStage] = useState(selectedBlade.status)
  const [activeStage, setActiveStage] = useState(selectedBlade.status)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedFile, setHighlightedFile] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [previewFile, setPreviewFile] = useState<{
    name: string;
    type: string;
    previewUrl: string;
  } | null>(null)

  // 搜索功能
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setHighlightedFile(null)
    
    if (!query.trim()) {
      // 清空搜索时，返回到当前进度节点
      setActiveStage(selectedStage)
      return
    }

    // 遍历所有叶片和阶段查找匹配的文件
    for (const fan of fans) {
      for (const blade of fan.blades) {
        for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
          const stage = stages[stageIndex]
          const matchingFile = stage.files.find(file => 
            file.name.toLowerCase().includes(query.toLowerCase())
          )
          
          if (matchingFile) {
            setSelectedFan(fan)
            setSelectedBlade(blade)
            setSelectedStage(blade.status)
            setActiveStage(stageIndex)
            setHighlightedFile(matchingFile.name)
            return
          }
        }
      }
    }
  }

  // 当选择新的风扇时，更新选中的叶片
  useEffect(() => {
    setSelectedBlade(selectedFan.blades[0])
    setSelectedStage(selectedFan.blades[0].status)
    setActiveStage(selectedFan.blades[0].status)
  }, [selectedFan])

  // 当选择新的叶片时，更新检测阶段
  useEffect(() => {
    setSelectedStage(selectedBlade.status)
    setActiveStage(selectedBlade.status)
  }, [selectedBlade])

  // 当点击阶段时，只更新activeStage
  const handleStageClick = (index: number) => {
    setActiveStage(index)
  }

  const handleFilePreview = (file: any) => {
    setPreviewFile(file);
    // 这里可以调用预览插件
    console.log('Preview file:', file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[90rem] mx-auto px-4">
        {/* 搜索框 */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="搜索文件..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* 产品选择和信息展示 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">产品质检</h1>
            </div>
            <Select 
              value={selectedFan.id} 
              onValueChange={(value) => setSelectedFan(fans.find(fan => fan.id === value) || fans[0])}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="选择风扇产品" />
              </SelectTrigger>
              <SelectContent>
                {fans.map(fan => (
                  <SelectItem key={fan.id} value={fan.id}>
                    {fan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-white p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">型号</h3>
                    <p className="text-gray-600">{selectedFan.model}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faRuler} className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">尺寸</h3>
                    <p className="text-gray-600">{selectedFan.size}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faGears} className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">材料</h3>
                    <p className="text-gray-600">{selectedFan.material}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">应用领域</h3>
                    <p className="text-gray-600">{selectedFan.application}</p>
                  </div>
                </div>
                <div className="md:col-span-2 flex items-start space-x-3">
                  <FontAwesomeIcon icon={faFileAlt} className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">产品描述</h3>
                    <p className="text-gray-600">{selectedFan.description}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="w-[200px] h-[200px] bg-gray-50 rounded-lg p-2">
                  <img 
                    src={selectedFan.image} 
                    alt={selectedFan.name}
                    className="w-full h-full object-contain rounded-lg opacity-90"
                  />
                </div>
              </div>
            </div>
          </Card>
          <div className="flex items-center space-x-4 mb-6">
              <FontAwesomeIcon icon={faFan} className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold">进度展示</h2>
            </div>
          {/* 叶片选择 */}
          <div className="flex items-center space-x-4 mb-6">
            {selectedFan.blades.map((blade) => (
              <div
                key={blade.id}
                onClick={() => setSelectedBlade(blade)}
                className={`
                  px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
                  ${blade.id === selectedBlade.id 
                    ? 'bg-blue-500 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {blade.name}
              </div>
            ))}
          </div>
        </div>

        {/* 时间轴容器 */}
        <div className="relative mb-12">
          <div 
            ref={timelineRef}
            className="pb-4 hide-scrollbar"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <div className="min-w-max px-4">
              {/* 背景线 */}
              <div className="absolute top-[2.75rem] left-8 right-8 h-1 bg-gray-200" />
              
              {/* 进度线 */}
              <div 
                className="absolute top-[2.75rem] left-8 h-1 bg-gradient-to-r from-blue-500 to-blue-500 transition-all duration-300"
                style={{ 
                  width: `calc(${(selectedStage + 1) * (100/6)}% - ${selectedStage > 0 ? 20 : 0}px)`,
                }} 
              />

              {/* 时间轴节点 */}
              <div className="relative flex justify-between mx-8 min-w-[800px]">
                {stages.map((stage, index) => {
                  const isCompleted = index < selectedStage
                  const isSelected = index === activeStage
                  const isPending = index > selectedStage

                  return (
                    <div 
                      key={index}
                      className="flex flex-col items-center cursor-pointer px-4"
                      onClick={() => handleStageClick(index)}
                    >
                      {/* 节点图标 */}
                      <div className={`
                        relative z-10 w-14 h-14 rounded-full
                        flex items-center justify-center mb-4
                        border-4 transition-all duration-300
                        ${isSelected 
                          ? `${stage.color} ${stage.borderColor} scale-110 shadow-lg ring-4 ring-offset-2 ring-${stage.borderColor.split('-')[1]}-200` 
                          : isCompleted
                            ? `bg-white ${stage.borderColor} text-${stage.borderColor.split('-')[1]}-500`
                            : `bg-white border-gray-200 text-gray-400`
                        }
                        ${isPending ? 'hover:border-gray-300' : ''}
                      `}>
                        {isCompleted ? (
                          <FontAwesomeIcon icon={faCheck} className="h-6 w-6" />
                        ) : (
                          <FontAwesomeIcon icon={stage.icon} className="h-6 w-6" />
                        )}
                      </div>
                      
                      {/* 节点标题 */}
                      <h3 className={`
                        text-sm font-medium text-center mb-2 whitespace-nowrap transition-colors duration-300
                        ${isSelected 
                          ? 'text-gray-900 font-semibold' 
                          : isCompleted
                            ? 'text-gray-700'
                            : 'text-gray-400'
                        }
                      `}>
                        {stage.title}
                      </h3>
                      
                      {/* 进度指示点 */}
                      <div className={`
                        w-3 h-3 rounded-full transition-all duration-300
                        ${isSelected
                          ? `${stage.color} ${stage.borderColor.replace('border', 'ring')} ring-2 ring-offset-2`
                          : isCompleted
                            ? stage.borderColor.replace('border', 'bg')
                            : 'bg-gray-200'
                        }
                      `} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 文档列表 */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-12"
        >
          <Card className="bg-white overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${stages[activeStage].color} flex items-center justify-center shadow-lg`}>
                    <FontAwesomeIcon icon={stages[activeStage].icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{stages[activeStage].title}</h2>
                    <p className="text-gray-500 text-sm">
                      {selectedFan.name} - {selectedBlade.name}的检测文档
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stages[activeStage].files.map((file, fileIndex) => (
                  <motion.div
                    key={fileIndex}
                    variants={item}
                    className={`
                      p-4 rounded-lg ${stages[activeStage].lightColor}
                      hover:shadow-md transition-all duration-200 cursor-pointer
                      transform hover:-translate-y-1 group
                      ${highlightedFile === file.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                    `}
                    onClick={() => handleFilePreview(file)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-lg ${stages[activeStage].color} 
                        flex items-center justify-center
                        group-hover:shadow-md transition-shadow duration-200
                      `}>
                        <FontAwesomeIcon icon={file.icon} className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`
                          text-sm font-medium truncate
                          ${highlightedFile === file.name ? 'text-blue-600' : ''}
                        `}>
                          {file.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">点击预览</p>
                      </div>
                      <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className={`
                          h-4 w-4 opacity-0 group-hover:opacity-100 
                          transition-all duration-200 transform group-hover:translate-x-1
                          ${stages[activeStage].borderColor.replace('border', 'text')}
                        `} 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {previewFile && (
        <FilePreview 
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
} 