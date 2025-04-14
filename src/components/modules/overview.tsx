'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUsers, 
  faFileAlt, 
  faInfoCircle,
  faProjectDiagram,
  faMoneyBillWave,
  faTasks,
  faCheckCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from 'framer-motion'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// 动态导入甘特图组件
const GanttChart = dynamic(() => import('./GanttChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center text-gray-500">
      加载中...
    </div>
  )
})

// 模拟项目数据
const projects = [
  { id: '1', name: '智能制造项目 A' },
  { id: '2', name: '新能源项目 B' },
  { id: '3', name: '医疗科技项目 C' }
]

// 模拟项目任务数据
const projectTasks = [
  { id: 1, title: '项目立项会议', status: 'completed', dueDate: '2024-01-05', assignee: '张三' },
  { id: 2, title: '尽职调查准备', status: 'completed', dueDate: '2024-01-15', assignee: '李四' },
  { id: 3, title: '财务尽职调查', status: 'in-progress', dueDate: '2024-02-15', assignee: '王五' },
  { id: 4, title: '法律尽职调查', status: 'in-progress', dueDate: '2024-02-20', assignee: '赵六' },
  { id: 5, title: '投资决策委员会', status: 'pending', dueDate: '2024-03-10', assignee: '张三' },
  { id: 6, title: '投资协议谈判', status: 'pending', dueDate: '2024-03-20', assignee: '李四' }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const fadeInTop = {
  hidden: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  show: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// 模拟项目团队数据
const teamMembers = [
  { name: '张三', role: '项目负责人', avatar: '/avatars/01.png' },
  { name: '李四', role: '技术总监', avatar: '/avatars/02.png' },
  { name: '王五', role: '财务主管', avatar: '/avatars/03.png' }
]

// 模拟项目基本信息
const projectInfo = {
  投资金额: '1000万',
  投资轮次: 'A轮',
  投资时间: '2024-01',
  持股比例: '15%',
  估值: '1亿'
}

// 模拟财务数据
const financialData = {
  营收: '500万',
  利润: '100万',
  现金流: '200万',
  增长率: '30%'
}

export function Overview() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id)

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* 项目选择 */}
      <motion.div variants={fadeInTop} className="w-64">
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger>
            <SelectValue placeholder="选择项目" />
          </SelectTrigger>
          <SelectContent>
            {projects.map(project => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* 项目团队 */}
      <motion.div variants={fadeInTop}>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-blue-500" />
              <CardTitle>项目团队</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {member.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 项目基本信息和财务状况 */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div variants={fadeInTop}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-green-500" />
                <CardTitle>项目基本信息</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(projectInfo).map(([key, value], index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInTop}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faMoneyBillWave} className="h-5 w-5 text-yellow-500" />
                <CardTitle>财务状况</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(financialData).map(([key, value], index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 项目进度 */}
      <motion.div variants={fadeInTop}>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faProjectDiagram} className="h-5 w-5 text-purple-500" />
              <CardTitle>项目进度</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <GanttChart />
          </CardContent>
        </Card>
      </motion.div>

      {/* 项目任务和文档 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 项目任务 */}
        <motion.div variants={fadeInTop}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faTasks} className="h-5 w-5 text-blue-500" />
                <CardTitle>项目任务</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {task.status === 'completed' ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500" />
                      ) : task.status === 'in-progress' ? (
                        <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500">负责人: {task.assignee}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      截止日期: {task.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 项目文档 */}
        <motion.div variants={fadeInTop}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faFileAlt} className="h-5 w-5 text-blue-500" />
                <CardTitle>项目文档</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['投资协议.pdf', '尽职调查报告.pdf', '财务报表.xlsx'].map((doc, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4 text-blue-500" />
                      <span>{doc}</span>
                    </div>
                    <span className="text-sm text-gray-500">2024-03-15</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
} 