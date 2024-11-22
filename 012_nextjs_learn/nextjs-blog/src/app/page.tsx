"use client";
/**
 * 导航栏组件
 * 包含博客主页链接和其他页面链接
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* flex 分开布局 h-16 64px */}
          <div className="flex items-center justify-between h-16">
            {/* 交叉轴布局 */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Blog
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/posts" className="text-gray-600 hover:text-blue-600">
                文章
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                关于
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                联系
              </Link>
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 py-2">
                  练习导航
                </button>
                {/* 绝对定位的下拉菜单，初始状态为不可见，悬停时可见 */}
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {/* 
                  absolute: 绝对定位元素
                  left-0: 元素左边距为0
                  mt-2: 元素的上外边距为0.5rem (8px)
                  w-48: 元素宽度为12rem (192px)
                  bg-white: 背景颜色为白色
                  rounded-md: 中等圆角
                  shadow-lg: 大阴影效果
                  opacity-0: 初始透明度为0
                  invisible: 初始状态为不可见
                  group-hover:opacity-100: 当父元素悬停时，透明度变为100%
                  group-hover:visible: 当父元素悬停时，元素变为可见
                  transition-all: 所有属性的过渡效果
                  duration-300: 过渡效果持续300毫秒
                  z-50: z-index为50，控制元素的堆叠顺序
                */}
                  {/* padding-top padding-bottom 4px */}
                  <div className="py-1">
                    <Link href="/practice/spacing" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      间距与尺寸
                    </Link>
                    <Link href="/practice/colors" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                   详情   颜色与背景
                    </Link>
                    <Link href="/practice/typography" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      字体与文本
                    </Link>
                    <Link href="/practice/flex" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Flex布局
                    </Link>
                    <Link href="/practice/grid" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Grid布局
                    </Link>
                    <Link href="/practice/decorations" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      装饰与样式
                    </Link>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                登录
              </Button>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
    
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/posts" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                文章
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                关于
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                联系
              </Link>
              <div className="px-3 py-2">
                <button className="text-gray-600 hover:text-blue-600 w-full text-left">
                  练习导航
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/practice/spacing" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    间距与尺寸
                  </Link>
                  <Link href="/practice/colors" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    颜色与背景
                  </Link>
                  <Link href="/practice/typography" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    字体与文本
                  </Link>
                  <Link href="/practice/flex" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Flex布局
                  </Link>
                  <Link href="/practice/grid" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Grid布局
                  </Link>
                  <Link href="/practice/decorations" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    装饰与样式
                  </Link>
                </div>
              </div>
              <div className="px-3 py-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  登录
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 - 添加响应式设计 */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* 网格布局第一行：标题区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              Taxing Laughter: The Joke Tax Chronicles
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              The king, seeing how much happier his subjects were, realized the error of
              his ways and repealed the joke tax.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-4 lg:mt-0">
            <blockquote className="border-l-2 pl-4 sm:pl-6 italic text-gray-700">
              "After all," he said, "everyone enjoys a good joke, so it's only fair that
              they should pay for the privilege."
            </blockquote>
          </div>
        </div>

        {/* 网格布局第二行：三列卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">特色功能一</h3>
            <p className="text-sm sm:text-base text-gray-600">功能描述内容</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">特色功能二</h3>
            <p className="text-sm sm:text-base text-gray-600">功能描述内容</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">特色功能三</h3>
            <p className="text-sm sm:text-base text-gray-600">功能描述内容</p>
          </div>
        </div>

        {/* 网格布局第三行：内容区 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 border-b pb-2">
              天国的人民
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              详细的内容描述，可以放置大段文字。这里是主要的内容区域，
              可以包含文章的主体部分。
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold mb-2">快速链接</h3>
              <div className="space-y-2">
                <Link 
                  href="/pages/posts"
                  className="block text-blue-600 hover:text-blue-700 text-sm sm:text-base"
                >
                  查看所有文章
                </Link>
                <Button className="w-full text-sm sm:text-base">
                  开始阅读
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t mt-8 sm:mt-12">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <p className="text-center text-sm sm:text-base text-gray-600">
            © 2024 Your Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
