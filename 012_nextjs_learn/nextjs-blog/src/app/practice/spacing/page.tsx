/**
 * 间距与尺寸练习页面组件
 * 展示了 Tailwind CSS 中的内边距、外边距和尺寸相关的类的使用示例
 */
/**
 * 
 * @returns p-1  = 0.25rem = 4px
p-2  = 0.5rem  = 8px
p-3  = 0.75rem = 12px
p-4  = 1rem    = 16px
p-5  = 1.25rem = 20px
p-6  = 1.5rem  = 24px
p-8  = 2rem    = 32px
p-10 = 2.5rem  = 40px
p-12 = 3rem    = 48px
p-16 = 4rem    = 64px
 */
import Link from 'next/link'
export default function SpacingPracticePage() {
    return (
      // 页面容器,设置了自动外边距、内边距和背景色
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        {/* 页面标题,使用渐变色文字 */}
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          间距与尺寸练习
        </h1>
        
        {/* 内边距练习区块 */}
        <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">内边距 (Padding)</h2>
          <div className="space-y-6">
            {/* 展示四周内边距 */}
            <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-white p-4 rounded border border-blue-300">
                p-4: 所有方向内边距 4 (1rem)
              </div>
            </div>
            
            {/* 展示水平内边距 */}
            <div className="px-4 bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-white p-4 rounded border border-blue-300">
                px-4: 水平内边距 4 (1rem)
              </div>
            </div>
            
            {/* 展示垂直内边距 */}
            <div className="py-4 bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-white p-4 rounded border border-blue-300">
                py-4: 垂直内边距 4 (1rem)
              </div>
            </div>
          </div>
        </section>
  
        {/* 外边距练习区块 */}
        <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">外边距 (Margin)</h2>
          <div className="space-y-6 bg-gray-100 p-6 rounded-lg">
            {/* 展示四周外边距 */}
            <div className="m-4 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              m-4: 所有方向外边距 4 (1rem)
            </div>
            
            {/* 展示水平外边距 */}
            <div className="mx-4 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              mx-4: 水平外边距 4 (1rem)
            </div>
            
            {/* 展示垂直外边距 */}
            <div className="my-4 bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              my-4: 垂直外边距 4 (1rem)
            </div>
          </div>
        </section>
  
        {/* 尺寸练习区块 */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-purple-600">尺寸 (Size)</h2>
          <div className="space-y-6">
            {/* 宽度示例区域 */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-2">宽度示例：</p>
              {/* 展示100%宽度 */}
              <div className="w-full bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                w-full: 100% 宽度
              </div>
              
              {/* 展示50%宽度 */}
              <div className="w-1/2 bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                w-1/2: 50% 宽度
              </div>
              
              {/* 展示25%宽度 */}
              <div className="w-1/4 bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                w-1/4: 25% 宽度
              </div>
            </div>
  
            {/* 高度示例区域 */}
            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-2">高度示例：</p>
              <div className="flex space-x-4 h-40">
                {/* 展示全高 */}
                <div className="w-1/4 h-full bg-gradient-to-b from-purple-100 to-purple-200 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center">
                  h-full
                </div>
                {/* 展示3/4高度 */}
                <div className="w-1/4 h-3/4 bg-gradient-to-b from-purple-100 to-purple-200 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center">
                  h-3/4
                </div>
                {/* 展示1/2高度 */}
                <div className="w-1/4 h-1/2 bg-gradient-to-b from-purple-100 to-purple-200 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center">
                  h-1/2
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* 间距比例尺展示区块 */}
        <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">间距比例尺</h2>
          {/* 使用map循环展示不同大小的内边距 */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
              <div key={size} className="flex items-center">
                <div className="w-20 text-sm text-gray-600">p-{size}</div>
                <div className={`p-${size} bg-indigo-100 border-2 border-indigo-300 rounded`}>
                  间距示例
                </div>
              </div>
            ))}
          </div>
          <Link href="/practice/spacingc">练习</Link>
        </section>
      </div>
    );
  }