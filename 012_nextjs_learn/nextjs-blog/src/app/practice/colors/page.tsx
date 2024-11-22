/**
 * 颜色和背景练习页面组件
 * 展示了 Tailwind CSS 中的文字颜色、背景色和渐变色的使用示例
 */
export default function ColorsPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        颜色与背景练习
      </h1>

      {/* 文字颜色示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">文字颜色</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-blue-500">文字蓝色 (text-blue-500)</div>
          <div className="text-red-500">文字红色 (text-red-500)</div>
          <div className="text-green-500">文字绿色 (text-green-500)</div>
          <div className="text-purple-500">文字紫色 (text-purple-500)</div>
        </div>
      </section>

      {/* 背景色示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-green-600">背景颜色</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-100 rounded">浅蓝背景 (bg-blue-100)</div>
          <div className="p-4 bg-red-100 rounded">浅红背景 (bg-red-100)</div>
          <div className="p-4 bg-green-100 rounded">浅绿背景 (bg-green-100)</div>
          <div className="p-4 bg-purple-100 rounded">浅紫背景 (bg-purple-100)</div>
        </div>
      </section>

      {/* 渐变色示例 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-purple-600">渐变色</h2>
        <div className="space-y-4">
          <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white">
            蓝色到紫色渐变 (from-blue-500 to-purple-500)
          </div>
          <div className="h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded flex items-center justify-center text-white">
            绿色到蓝色渐变 (from-green-400 to-blue-500)
          </div>
          <div className="h-20 bg-gradient-to-r from-yellow-400 to-red-500 rounded flex items-center justify-center text-white">
            黄色到红色渐变 (from-yellow-400 to-red-500)
          </div>
        </div>
      </section>
    </div>
  )
}