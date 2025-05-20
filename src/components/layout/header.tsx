'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faQuestionCircle, faBars, faStar, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GlobalSearch } from "@/components/search/global-search"
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex h-14 border-b bg-[#1B2A47] text-white">
      <div className="flex items-center px-4 border-r border-gray-700">
        <Button variant="ghost" size="icon" className="text-white">
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center px-4 border-r border-gray-700">
        <Link href="/" className="text-xl font-semibold">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent">
              Cyber
            </span> - 知识库管理系统</Link>
      </div>

      <div className="flex items-center px-4 flex-1">
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            内部
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            投资
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            供应商
          </Button>
        </nav>
      </div>
      
      <div className="flex items-center px-4 space-x-4">
        <GlobalSearch />
        
        <Button variant="ghost" size="icon" className="text-white">
          <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white">
          <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white">
          <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white">
          <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="用户头像" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">管理员</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              个人设置
            </DropdownMenuItem>
            <DropdownMenuItem>
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 