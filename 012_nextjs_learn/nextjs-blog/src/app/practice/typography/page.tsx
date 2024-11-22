/**
 * 字体和文本练习页面组件
 * 展示了 Tailwind CSS 中的字体大小、字体粗细、字体系列、文本对齐等相关类的使用示例
 */
export default function FontPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        字体与文本练习
      </h1>

      {/* 字体大小示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">字体大小</h2>
        <div className="space-y-4">
          <p className="text-xs">超小号文本 (text-xs)</p>
          <p className="text-sm">小号文本 (text-sm)</p>
          <p className="text-base">基础文本 (text-base)</p>
          <p className="text-lg">大号文本 (text-lg)</p>
          <p className="text-xl">超大号文本 (text-xl)</p>
          <p className="text-2xl">特大号文本 (text-2xl)</p>
        </div>
      </section>

      {/* 字体粗细示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-green-600">字体粗细</h2>
        <div className="space-y-4">
          <p className="font-light">细体文本 (font-light)</p>
          <p className="font-normal">常规文本 (font-normal)</p>
          <p className="font-medium">中等文本 (font-medium)</p>
          <p className="font-semibold">半粗体文本 (font-semibold)</p>
          <p className="font-bold">粗体文本 (font-bold)</p>
        </div>
      </section>

      {/* 字体系列示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-purple-600">字体系列</h2>
        <div className="space-y-4">
          <p className="font-sans">无衬线字体 (font-sans)</p>
          <p className="font-serif">衬线字体 (font-serif)</p>
          <p className="font-mono">等宽字体 (font-mono)</p>
        </div>
      </section>

      {/* 文本对齐示例 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-red-600">文本对齐</h2>
        <div className="space-y-4">
          <p className="text-left bg-gray-100 p-2">左对齐文本 (text-left)</p>
          <p className="text-center bg-gray-100 p-2">居中对齐文本 (text-center)</p>
          <p className="text-right bg-gray-100 p-2">右对齐文本 (text-right)</p>
          <p className="text-justify bg-gray-100 p-2">
            两端对齐文本 (text-justify) - 这是一段较长的文本，用来演示两端对齐的效果。
            文本会自动调整字间距，使得每一行都能够充满整个容器的宽度。
          </p>
        </div>
      </section>
    </div>
  )
}