'use client'

import { Input } from "@/components/ui/input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFire,
  faBook,
  faRobot,
  faLightbulb,
  faHeart,
  faComments
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { Card } from "../ui/card"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
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

const hotTopics = [
  {
    title: "什么是智能助手?",
    description: "了解 AI 助手的基本概念和应用场景"
  },
  {
    title: "如何提出好的问题?",
    description: "学习如何与 AI 助手进行有效对话"
  },
  {
    title: "文档在哪里?",
    description: "查看完整的使用文档和最佳实践"
  }
]

const designGuides = [
  {
    icon: faHeart,
    title: "了解智能助手",
    description: "如何更好地使用 AI 助手?"
  },
  {
    icon: faLightbulb,
    title: "设置 AI 角色",
    description: "为不同场景配置合适的 AI 角色"
  },
  {
    icon: faComments,
    title: "表达需求",
    description: "学习如何清晰地表达你的需求"
  }
]

export function AIGC() {
  return (
    <Card className="max-w-5xl p-5 mx-auto h-full flex flex-col">
      {/* 头部区域 */}
      <motion.div 
        className="flex items-center space-x-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faRobot} className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">你好，我是智能助手</h1>
          <p className="text-gray-600">基于大语言模型，为您提供智能对话服务</p>
        </div>
      </motion.div>

      <motion.div 
        className="text-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        你想要了解什么？
      </motion.div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* 热门话题 */}
        <div>
          <motion.div 
            className="flex items-center space-x-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FontAwesomeIcon icon={faFire} className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold">热门话题</h2>
          </motion.div>
          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {hotTopics.map((topic, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 cursor-pointer"
              >
                <h3 className="font-medium mb-1">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 使用指南 */}
        <div>
          <motion.div 
            className="flex items-center space-x-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FontAwesomeIcon icon={faBook} className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">使用指南</h2>
          </motion.div>
          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {designGuides.map((guide, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={guide.icon} className="h-5 w-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 底部输入框 */}
      <motion.div 
        className="mt-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Input 
          className="w-full pr-12 py-6 text-lg rounded-xl shadow-sm" 
          placeholder="输入你的问题..." 
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600">
          <FontAwesomeIcon icon={faRobot} className="h-6 w-6" />
        </button>
      </motion.div>
    </Card>
  )
} 