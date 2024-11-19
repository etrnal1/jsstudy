import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl">我的博客</Link>
        <nav className="ml-auto flex gap-4">
          <Link href="/">首页</Link>
          <Link href="/posts">文章</Link>
          <Link href="/about">关于</Link>
          <Button variant="outline">登录</Button>
        </nav>
      </div>
    </header>
  )
} 