import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Blog
              </Link>
              <div className="hidden md:flex space-x-4">
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
                  {/* 下拉菜单内容 */}
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
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
                </div>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              登录
            </Button>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        {/* 网格布局第一行：标题区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              Taxing Laughter: The Joke Tax Chronicles
            </h1>
            <p className="text-lg text-gray-600">
              The king, seeing how much happier his subjects were, realized the error of
              his ways and repealed the joke tax.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <blockquote className="border-l-2 pl-6 italic text-gray-700">
              "After all," he said, "everyone enjoys a good joke, so it's only fair that
              they should pay for the privilege."
            </blockquote>
          </div>
        </div>

        {/* 网格布局第二行：三列卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <h3 className="text-xl font-semibold mb-3">特色功能一</h3>
            <p className="text-gray-600">功能描述内容</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <h3 className="text-xl font-semibold mb-3">特色功能二</h3>
            <p className="text-gray-600">功能描述内容</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3">特色功能三</h3>
            <p className="text-gray-600">功能描述内容</p>
          </div>
        </div>

        {/* 网格布局第三行：内容区 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight mb-6 border-b pb-2">
              天国的人民
            </h2>
            <p className="text-gray-600 mb-4">
              详细的内容描述，可以放置大段文字。这里是主要的内容区域，
              可以包含文章的主体部分。
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">快速链接</h3>
              <div className="space-y-2">
                <Link 
                  href="/pages/posts"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  查看所有文章
                </Link>
                <Button className="w-full">
                  开始阅读
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2024 Your Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
