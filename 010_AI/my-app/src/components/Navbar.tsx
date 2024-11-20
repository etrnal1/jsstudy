'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: '首页', path: '/' },
    { name: '文章', path: '/blog/posts' },
    { name: '关于', path: '/blog/about' },
  ]

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl hover:text-gray-700 transition-colors">
          我的博客
        </Link>
        
        <nav className="ml-auto flex items-center gap-4">
          {/* 导航链接区域 */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`hover:text-gray-700 transition-colors ${
                pathname === item.path ? 'text-gray-900 font-medium' : 'text-gray-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* 用户操作按钮区域 */}
          <div className="flex gap-2 ml-4">
            <Button variant="outline" asChild>
              <Link href="/blog/posts/new">发表文章</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog/login">登录</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog/register">注册</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
} 



