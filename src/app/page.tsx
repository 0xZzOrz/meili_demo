'use client'

import { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFileLines,
  faArrowTrendUp,
  faComments,
  faChartLine,
  faArrowsRotate,
  faImage,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [activeTimeRange, setActiveTimeRange] = useState('today')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // 雷达图配置
  const radarOption = {
    color: ['#3B82F6', '#10B981', '#6366F1'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['资本投资表现', '行业平均水平', '目标基准'],
      bottom: 0
    },
    radar: {
      indicator: [
        { name: '投资咨询服务', max: 100 },
        { name: '创新技术水平', max: 100 },
        { name: '生态协同效应', max: 100 },
        { name: '投资回报率', max: 100 },
        { name: '地域布局广度', max: 100 },
        { name: '投资风险控制', max: 100 }
      ],
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0.2)', 'rgba(245,245,245,0.2)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(59, 130, 246, 0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(59, 130, 246, 0.2)'
        }
      }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [85, 90, 75, 80, 70, 85],
          name: '资本投资表现',
          areaStyle: {
            opacity: 0.3
          }
        },
        {
          value: [70, 75, 80, 65, 75, 70],
          name: '行业平均水平',
          areaStyle: {
            opacity: 0.3
          }
        },
        {
          value: [90, 85, 85, 85, 80, 90],
          name: '目标基准',
          areaStyle: {
            opacity: 0.3
          }
        }
      ]
    }]
  }

  // 饼图配置
  const pieOption = {
    color: ['#3B82F6', '#10B981', '#F43F5E', '#6366F1', '#F59E0B'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      left: 'center',
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12,
        color: '#666'
      },
      formatter: (name: string) => {
        const data = pieOption.series[0].data
        const item = data.find(i => i.name === name)
        return `${name}: ${item?.value}%`
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 35, name: '云计算、人工智能' },
          { value: 25, name: '先进制造半导体' },
          { value: 20, name: '大健康' },
          { value: 12, name: '区域众创生态' },
          { value: 8, name: '其他领域' }
        ]
      }
    ]
  }

  // 趋势图配置
  const trendOption = {
    color: ['#3B82F6', '#10B981'],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['投资金额', '项目数量'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: [
      {
        type: 'value',
        name: '金额(亿)',
        position: 'left'
      },
      {
        type: 'value',
        name: '数量',
        position: 'right'
      }
    ],
    series: [
      {
        name: '投资金额',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230]
      },
      {
        name: '项目数量',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [220, 182, 191, 234, 290, 330]
      }
    ]
  }

  const stats = [
    { icon: faFileLines, label: '事件累计总数', value: '102,400', change: '+12.5%', color: 'text-blue-500' },
    { icon: faArrowTrendUp, label: '当天事件数量', value: '81,212', change: '+8.3%', color: 'text-green-500' },
    { icon: faArrowsRotate, label: '转发总数', value: '9,280', change: '+15.2%', color: 'text-purple-500' },
    { icon: faComments, label: '评论总数', value: '13,600', change: '+10.7%', color: 'text-red-500' },
    { icon: faChartLine, label: '增涨趋势', value: '9,280', change: '+5.8%', color: 'text-yellow-500' },
    { icon: faImage, label: '持续天数', value: '360', change: '+1', color: 'text-indigo-500' }
  ]

  const timeRanges = [
    { key: 'today', label: '今日' },
    { key: 'week', label: '本周' },
    { key: 'month', label: '本月' },
    { key: 'quarter', label: '本季度' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* 时间范围选择器 */}
      <div className="flex items-center space-x-4 mb-6">
        {timeRanges.map(range => (
          <button
            key={range.key}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTimeRange === range.key
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTimeRange(range.key)}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* 数据统计卡片 */}
      <div className="grid grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow p-4 transition-transform duration-200 cursor-pointer ${
              hoveredCard === index ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={stat.icon} className={`h-5 w-5 ${stat.color}`} />
                <div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-xl font-semibold">{stat.value}</div>
                </div>
              </div>
              <div className={`text-sm ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">投资领域分布</h3>
            <FontAwesomeIcon 
              icon={faInfoCircle} 
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              title="展示各投资领域的占比分布"
            />
          </div>
          <ReactECharts option={pieOption} style={{ height: '400px' }} />
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">投资趋势分析</h3>
            <FontAwesomeIcon 
              icon={faInfoCircle} 
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              title="展示投资金额和项目数量的变化趋势"
            />
          </div>
          <ReactECharts option={trendOption} style={{ height: '400px' }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">投资表现分析</h3>
            <FontAwesomeIcon 
              icon={faInfoCircle} 
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              title="多维度展示投资表现指标"
            />
          </div>
          <ReactECharts option={radarOption} style={{ height: '400px' }} />
        </div>

        {/* 热点资讯 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">创业与投资圈实时热点</h3>
            <button className="text-blue-500 text-sm hover:text-blue-600">
              更多 &gt;
            </button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, title: 'AI投资持续升温，大模型赛道获资本青睐', tag: '热', time: '10分钟前' },
              { id: 2, title: '融资资本布局半导体产业链，国产替代加速', tag: '荐', time: '30分钟前' },
              { id: 3, title: 'S基金发展提速，科技创新驱动转型', tag: '新', time: '1小时前' },
              { id: 4, title: '银行系长线资金入场，稳定器作用凸显', tag: '', time: '2小时前' },
              { id: 5, title: '并购重组活跃度提升，退出渠道多元化', tag: '', time: '3小时前' }
            ].map((item) => (
              <div 
                key={item.id} 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-gray-400 text-sm">{item.id}</span>
                <span className="flex-1 text-sm">{item.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-xs">{item.time}</span>
                  {item.tag && (
                    <span className={`px-1.5 py-0.5 text-xs rounded ${
                      item.tag === '热' ? 'bg-red-100 text-red-600' :
                      item.tag === '荐' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
