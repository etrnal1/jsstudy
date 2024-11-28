"use client";
import { useState } from "react";
export default function Grids() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* 
              Header优化:
              1. sticky定位和z-index确保在滚动时始终可见
              2. 使用柔和的蓝色背景(bg-blue-100)
              3. 响应式文字大小和内边距
              4. 添加移动端菜单按钮
            */}
            <header className="sticky top-0 z-10 text-black text-xl md:text-2xl p-3 md:p-4 bg-blue-100 flex justify-between items-center">
                <span>header</span>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 hover:bg-blue-200 rounded"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            <main className="flex flex-1">
                {/* 
                  侧边栏优化:
                  1. 移动端默认隐藏,可通过菜单按钮触发显示
                  2. 平滑的过渡动画效果
                  3. 导航项添加hover效果和圆角
                  4. 固定宽度和高度
                */}
                <aside className={`fixed md:static md:block w-64 h-full bg-gray-100 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                    <nav className="p-4">
                        <ul className="space-y-2">
                            <li className="hover:bg-gray-200 p-2 rounded cursor-pointer transition-colors">导航项 1</li>
                            <li className="hover:bg-gray-200 p-2 rounded cursor-pointer transition-colors">导航项 2</li>
                            <li className="hover:bg-gray-200 p-2 rounded cursor-pointer transition-colors">导航项 3</li>
                        </ul>
                    </nav>
                </aside>

                {/* 
                  内容区域优化:
                  1. 响应式内边距
                  2. 最大宽度限制,居中显示
                  3. 响应式文字大小
                  4. 文字颜色使用灰色提高可读性
                  5. 添加滚动条
                */}
                <div className="flex-1 p-4 md:p-6 bg-white overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-xl md:text-2xl font-bold mb-4">内容标题</h1>
                        <p className="text-gray-600 text-sm md:text-base">这里是主要内容区域</p>
                    </div>
                </div>
            </main>
            
            {/* 
              Footer优化:
              1. 深色背景配浅色文字
              2. 响应式布局(移动端垂直,桌面端水平)
              3. 添加hover效果
              4. 响应式间距和文字大小
            */}
            <footer className="bg-gray-800 p-3 md:p-4 text-white text-sm md:text-base">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <div>© 2024 Your Company</div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300">关于</a>
                        <a href="#" className="hover:text-gray-300">联系我们</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}