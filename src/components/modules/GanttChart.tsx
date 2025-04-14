'use client'

import { useEffect, useRef } from 'react'
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'

// 甘特图配置
const tasks = [
  { id: 1, text: '项目立项', start_date: '2024-01-01', duration: 30, progress: 1 },
  { id: 2, text: '尽职调查', start_date: '2024-02-01', duration: 45, progress: 0.8 },
  { id: 3, text: '投资决策', start_date: '2024-03-15', duration: 15, progress: 0.6 },
  { id: 4, text: '协议签署', start_date: '2024-04-01', duration: 15, progress: 0.4 },
  { id: 5, text: '资金注入', start_date: '2024-04-15', duration: 7, progress: 0.2 },
  { id: 6, text: '投后管理', start_date: '2024-04-22', duration: 90, progress: 0.1 }
]

const links = [
  { id: 1, source: 1, target: 2, type: '0' },
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  { id: 4, source: 4, target: 5, type: '0' },
  { id: 5, source: 5, target: 6, type: '0' }
]

export default function GanttChart() {
  const ganttContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ganttContainer.current) {
      // 初始化甘特图
      gantt.init(ganttContainer.current)
      
      // 配置甘特图
      gantt.config.scale_unit = "month"
      gantt.config.date_scale = "%Y-%m-%d"
      gantt.config.subscales = [
        { unit: "week", step: 1, date: "%W" }
      ]
      gantt.config.columns = [
        { name: "text", label: "任务名称", tree: true, width: 200 },
        { name: "start_date", label: "开始时间", align: "center", width: 100 },
        { name: "duration", label: "持续时间", align: "center", width: 80 },
        { name: "progress", label: "进度", align: "center", width: 80 }
      ]
      
      // 加载数据
      gantt.parse({ tasks, links })
    }

    return () => {
      if (ganttContainer.current) {
        gantt.clearAll()
      }
    }
  }, [])

  return (
    <div 
      ref={ganttContainer}
      className="h-[400px] w-full"
      style={{ 
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}
    />
  )
} 