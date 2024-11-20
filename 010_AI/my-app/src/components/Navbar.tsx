import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl">我的博客</Link>
        <nav className="ml-auto flex gap-4">
          {/* 导航链接区域 */}
          <Link href="/">首页</Link>
          <Link href="/posts">文章</Link>
          <Link href="/about">关于</Link>
          
          {/* 用户操作按钮区域 */}
          <Button variant="outline" className="hover:bg-gray-700"><Link href="/blog/login">登录</Link></Button>
          <Button variant="outline" className="hover:bg-gray-700"><Link href="/blog/register">注册</Link></Button>
        </nav>
      </div>
    </header>
  )
} 



