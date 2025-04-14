'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome,
  faChartLine,
  faFileAlt,
  faRobot
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/landpage', icon: faHome, label: '工作台' },
  { href: '/overview', icon: faChartLine, label: '项目概览' },
  { href: '/document', icon: faFileAlt, label: '文档' },
  { href: '/aigc', icon: faRobot, label: 'AI助手' }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white">
      <div className="h-full flex flex-col justify-center">
        <nav className="flex-1 flex flex-col justify-center space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} 
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 