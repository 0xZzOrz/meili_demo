'use client'

import { Card } from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCloudUpload, 
  faRobot, 
  faChartLine, 
  faBuilding,
  faFileAlt,
  faQuestionCircle,
  faNewspaper,
  faDatabase,
  faChartBar
} from '@fortawesome/free-solid-svg-icons'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ease: "easeOut"
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export default function LandingPage() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      router.push('/aigc')
    }
  }

  return (
    <div className="min-h-full flex items-center overflow-hidden">
      <div className="w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">欢迎使用 MeiliCloud</h1>
            <p className="text-gray-600">
              MeiliCloud 是一个现代化的企业管理系统，提供全方位的企业服务。
            </p>
          </div>
          <motion.div 
            className="grid grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* 投研助手 */}
            <motion.div variants={item}>
              <Card className="bg-white hover:shadow-lg transition-shadow h-[400px] flex flex-col">
                <div className="px-6 border-b">
                  <div className="flex items-center space-x-2 pb-4">
                    <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold">投研助手</h2>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 pt-4 space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faCloudUpload} className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">文档上传</h3>
                          <p className="text-sm text-gray-600">自动归档、深度解读、深度分析</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faRobot} className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">智能问答</h3>
                          <p className="text-sm text-gray-600">提问精准、与专家对话、深度洞察</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faFileAlt} className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">研报编写</h3>
                          <p className="text-sm text-gray-600">业务分析、公司调研、价值评估</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 投后助手 */}
            <motion.div variants={item}>
              <Card className="bg-white hover:shadow-lg transition-shadow h-[400px] flex flex-col">
                <div className="px-6 border-b">
                  <div className="flex items-center space-x-2 pb-4">
                    <FontAwesomeIcon icon={faBuilding} className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-semibold">投后助手</h2>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 pt-4 space-y-4">
                    <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faChartBar} className="h-5 w-5 text-green-500" />
                        <div>
                          <h3 className="font-medium">创投项目</h3>
                          <p className="text-sm text-gray-600">建立新投资项目、有意向的创投项目</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faDatabase} className="h-5 w-5 text-green-500" />
                        <div>
                          <h3 className="font-medium">资料更新</h3>
                          <p className="text-sm text-gray-600">自动更新、实时监控、数据分析</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5 text-green-500" />
                        <div>
                          <h3 className="font-medium">智能提醒</h3>
                          <p className="text-sm text-gray-600">风险预警、进度跟踪、重要事项</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 创投情报站 */}
            <motion.div variants={item}>
              <Card className="bg-white hover:shadow-lg transition-shadow h-[400px] flex flex-col">
                <div className="px-6 border-b">
                  <div className="flex items-center space-x-2 pb-4">
                    <FontAwesomeIcon icon={faNewspaper} className="h-5 w-5 text-purple-500" />
                    <h2 className="text-lg font-semibold">创投情报站</h2>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 pt-4 space-y-6">
                    <div className="bg-purple-50 rounded-lg p-6 hover:bg-purple-100 transition-colors cursor-pointer">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-red-500 px-3 py-1 text-sm bg-red-50 rounded-full">风险预警</span>
                          <span className="text-sm text-gray-500">2024-03-15</span>
                        </div>
                        <span className="text-base font-medium">2024年第一期风险预警</span>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6 hover:bg-purple-100 transition-colors cursor-pointer">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-500 px-3 py-1 text-sm bg-blue-50 rounded-full">最新资讯</span>
                          <span className="text-sm text-gray-500">2024-03-14</span>
                        </div>
                        <span className="text-base font-medium">公告：创新和专利云有重大更新</span>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6 hover:bg-purple-100 transition-colors cursor-pointer">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-green-500 px-3 py-1 text-sm bg-green-50 rounded-full">资料更新</span>
                          <span className="text-sm text-gray-500">2024-03-13</span>
                        </div>
                        <span className="text-base font-medium">《2024年年报》等3份文档</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* AIGC 对话框 */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.9,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <Card className="bg-white">
              <div className="px-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FontAwesomeIcon icon={faRobot} className="h-5 w-5 text-purple-500" />
                  <h2 className="text-lg font-semibold">AI 助手</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Input
                    placeholder="输入您的问题，按回车键确认"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 