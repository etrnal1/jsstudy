/**
 * 装饰页面组件
 * 
 * 工作流程:
 * 1. Next.js 会自动将 app/practice/decorations/page.tsx 映射到 /practice/decorations 路由
 * 2. 当访问该路由时,Next.js 会调用这个组件函数
 * 3. 组件返回的 JSX 会被渲染到页面上
 * 
 * 组件说明:
 * - export default: 默认导出,使组件可以被其他文件导入
 * - function Decorations(): 定义一个函数组件
 * - return (): 返回要渲染的 JSX 结构
 * 
 * 样式说明:
 * - text-4xl: 文字大小为 4xl (36px)
 * - font-bold: 字体加粗
 * - text-center: 文字居中
 * - grid: 使用网格布局
 * - grid-cols-8: 8列网格
 * - bg-*: 设置不同的背景颜色
 */
export default function Decorations() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">装饰与样式练习</h1>

        {/* 边框样式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">边框样式</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-1 border-4 border-blue-500 rounded">基础边框</div>
            <div className="p-4 border-4 border-dashed border-green-500 rounded-lg">虚线边框</div>
            <div className="p-4 border-8 border-dotted border-purple-500 rounded-xl">点线边框</div>
          </div>
        </section>

        {/* 阴影效果 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">阴影效果</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow-sm rounded">浅阴影</div>
            <div className="p-4 bg-white shadow-md rounded">中等阴影</div>
            <div className="p-4 bg-white shadow-lg rounded">深阴影</div>
          </div>
        </section>

        {/* 渐变背景 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">渐变背景</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
            <div className="h-32 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded"></div>
          </div>
        </section>

        {/* 变换效果 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">变换效果</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-blue-500 text-white rounded transform hover:scale-110 transition-transform">
              放大效果
            </div>
            <div className="p-4 bg-green-500 text-white rounded transform hover:rotate-12 transition-transform">
              旋转效果
            </div>
            <div className="p-4 bg-purple-500 text-white rounded transform hover:skew-x-12 transition-transform">
              倾斜效果
            </div>
            <div className="p-4 bg-pink-500 text-white rounded transform hover:-translate-y-2 transition-transform">
              位移效果
            </div>
          </div>
        </section>

        {/* 滤镜效果 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">滤镜效果</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500 text-white rounded blur-sm">模糊效果</div>
            <div className="p-4 bg-blue-500 text-white rounded brightness-125">高亮效果</div>
            <div className="p-4 bg-blue-500 text-white rounded contrast-125">对比度效果</div>
          </div>
        </section>
      </div>
     

    <h2 className="text-2xl font-semibold mb-4">练习背景色</h2>
    {/* 注意拼写,从上到下开始渐变色 */}
    <div>
        <div className="h-10 bg-gradient-to-t from-blue-500 to-purple-600">李</div>
    </div>
    </div>
  );
}