/**
 * Flex布局练习页面组件
 * 
 * @example
 * // 基础Flex容器
 * <div className="flex">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </div>
 * 
 * // 主轴方向
 * <div className="flex flex-row">...</div> // 水平排列
 * <div className="flex flex-col">...</div> // 垂直排列
 * 
 * // 主轴对齐
 * <div className="flex justify-start">...</div> // 起点对齐
 * <div className="flex justify-center">...</div> // 居中对齐
 * <div className="flex justify-end">...</div> // 终点对齐
 * <div className="flex justify-between">...</div> // 两端对齐
 * <div className="flex justify-around">...</div> // 分散对齐
 * 
 * // 交叉轴对齐
 * <div className="flex items-start">...</div> // 起点对齐
 * <div className="flex items-center">...</div> // 居中对齐
 * <div className="flex items-end">...</div> // 终点对齐
 * <div className="flex items-stretch">...</div> // 拉伸对齐
 * 
 * // Flex换行
 * <div className="flex flex-wrap">...</div> // 允许换行
 * <div className="flex flex-nowrap">...</div> // 不换行
 * 
 * // 弹性伸缩
 * <div className="flex-grow">...</div> // 自动扩展
 * <div className="flex-shrink">...</div> // 自动收缩
 * <div className="flex-none">...</div> // 固定尺寸
 * 
 * // 间距设置
 * <div className="flex gap-4">...</div> // 统一间距
 * <div className="flex gap-x-4">...</div> // 水平间距
 * <div className="flex gap-y-4">...</div> // 垂直间距
 */
export default function FlexPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Flex布局练习
      </h1>
      {/* 1xl 等于12px */}
      <h2 className="text-3xl font-bold underline">
        字体样式 (1rem = 16px)
      </h2>
      {/* p4 padding 4*4 16px */}
      <pre className="mt-4 p-4">
        {`<h2 className="text-3xl font-bold underline">字体样式 (1xl = 12px)</h2>`}
      </pre>

      {/* 1. Flex容器基础示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">Flex容器基础</h2>
        <div className="flex bg-gray-100 p-4 rounded">
          <div className="bg-blue-500 text-white p-4 rounded">Item 1</div>
          <div className="bg-blue-500 text-white p-4 rounded">Item 2</div>
          <div className="bg-blue-500 text-white p-4 rounded">Item 3</div>
        </div>
        <h2 className="text-2xl text-blue-700 mb-6 font-semibold">容器基础</h2>
{/* 练习 */}
        <div className="flex gap-4 p-4 bg-gray-500 rounded">
            <div className="p-4 text-white rounded bg-orange-500">item4</div>
            <div className="p-4 text-white rounded bg-blue-500">item5</div>
            <div className="p-4 text-white rounded bg-blue-500">item6</div>
        </div>
        {/* 问题分析：确保父容器的 display 属性为 flex，并且 gap 属性正确应用于父容器 */}
        {/* 解决方案：检查是否有其他 CSS 覆盖了 gap 属性，或者确保浏览器支持 gap 属性 */}
        {/* 练习结束 */}
        <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
          {`<div className="flex bg-gray-100 p-4 rounded">
  <div className="bg-blue-500 text-white p-4 rounded">Item 1</div>
  <div className="bg-blue-500 text-white p-4 rounded">Item 2</div>
  <div className="bg-blue-500 text-white p-4 rounded">Item 3</div>
</div>`}
        </pre>
        <p className="mt-4 text-gray-600">使用 flex 类创建一个基础的 Flex 容器，子元素会在一行内水平排列。</p>
      </section>

      {/* 2. 主轴方向示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-green-600">主轴方向</h2>
        <div className="space-y-4">
          <div className="flex flex-row bg-gray-100 p-4 rounded">
            <div className="bg-green-500 text-white p-4 rounded">Row 1</div>
            <div className="bg-green-500 text-white p-4 rounded">Row 2</div>
          </div>
          <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
            {`<div className="flex flex-row bg-gray-100 p-4 rounded">
  <div className="bg-green-500 text-white p-4 rounded">Row 1</div>
  <div className="bg-green-500 text-white p-4 rounded">Row 2</div>
</div>`}
          </pre>
          <div className="flex flex-col bg-gray-100 p-4 rounded">
            <div className="bg-green-500 text-white p-4 rounded">Column 1</div>
            <div className="bg-green-500 text-white p-4 rounded">Column 2</div>
          </div>
          <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
            {`<div className="flex flex-col bg-gray-100 p-4 rounded">
  <div className="bg-green-500 text-white p-4 rounded">Column 1</div>
  <div className="bg-green-500 text-white p-4 rounded">Column 2</div>
</div>`}
          </pre>
        </div>
        <p className="mt-4 text-gray-600">flex-row 类使元素水平排列，flex-col 类使元素垂直排列。</p>
      </section>

      {/* 3. 主轴对齐方式示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-purple-600">主轴对齐</h2>
        <div className="space-y-4">
          <div className="flex justify-start bg-gray-100 p-4 rounded">
            <div className="bg-purple-500 text-white p-4 rounded">Start</div>
            <div className="bg-purple-500 text-white p-4 rounded">Start</div>
          </div>
          <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
            {`<div className="flex justify-start bg-gray-100 p-4 rounded">
  <div className="bg-purple-500 text-white p-4 rounded">Start</div>
  <div className="bg-purple-500 text-white p-4 rounded">Start</div>
</div>`}
          </pre>
          <div className="flex justify-center bg-gray-100 p-4 rounded">
            <div className="bg-purple-500 text-white p-4 rounded">Center</div>
            <div className="bg-purple-500 text-white p-4 rounded">Center</div>
          </div>
          <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
            {`<div className="flex justify-center bg-gray-100 p-4 rounded">
  <div className="bg-purple-500 text-white p-4 rounded">Center</div>
  <div className="bg-purple-500 text-white p-4 rounded">Center</div>
</div>`}
          </pre>
          <div className="flex justify-end bg-gray-100 p-4 rounded">
            <div className="bg-purple-500 text-white p-4 rounded">End</div>
            <div className="bg-purple-500 text-white p-4 rounded">End</div>
          </div>
          <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
            {`<div className="flex justify-end bg-gray-100 p-4 rounded">
  <div className="bg-purple-500 text-white p-4 rounded">End</div>
  <div className="bg-purple-500 text-white p-4 rounded">End</div>
</div>`}
          </pre>
        </div>
        <p className="mt-4 text-gray-600">justify-start、justify-center、justify-end 类分别控制元素在主轴上的起始、居中和末端对齐。</p>
      </section>

      {/* 4. 交叉轴对齐方式示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-red-600">交叉轴对齐</h2>
        <div className="h-40 flex items-center bg-gray-100 p-4 rounded">
          <div className="bg-red-500 text-white p-4 rounded">Center</div>
          <div className="bg-red-500 text-white p-8 rounded">Center Tall</div>
          <div className="bg-red-500 text-white p-4 rounded">Center</div>
        </div>
        <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
          {`<div className="h-40 flex items-center bg-gray-100 p-4 rounded">
  <div className="bg-red-500 text-white p-4 rounded">Center</div>
  <div className="bg-red-500 text-white p-8 rounded">Center Tall</div>
  <div className="bg-red-500 text-white p-4 rounded">Center</div>
</div>`}
        </pre>
        <p className="mt-4 text-gray-600">items-center 类使元素在交叉轴（垂直方向）上居中对齐，即使元素高度不同。</p>
      </section>

      {/* 5. Flex换行示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-600">Flex换行</h2>
        <div className="flex flex-wrap bg-gray-100 p-4 rounded">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="bg-yellow-500 text-white p-4 m-2 rounded w-32">
              Item {n}
            </div>
          ))}
        </div>
        <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
          {`<div className="flex flex-wrap bg-gray-100 p-4 rounded">
  {[1, 2, 3, 4, 5].map((n) => (
    <div key={n} className="bg-yellow-500 text-white p-4 m-2 rounded w-32">
      Item {n}
    </div>
  ))}
</div>`}
        </pre>
        <p className="mt-4 text-gray-600">flex-wrap 类允许元素在空间不足时自动换行，避免内容溢出容器。</p>
      </section>

      {/* 6. 弹性伸缩示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">弹性伸缩</h2>
        <div className="flex bg-gray-100 p-4 rounded">
          <div className="flex-grow bg-indigo-500 text-white p-4 rounded">Grow</div>
          <div className="flex-none w-20 bg-indigo-500 text-white p-4 rounded mx-2">Fixed</div>
          <div className="flex-grow bg-indigo-500 text-white p-4 rounded">Grow</div>
        </div>
        <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
          {`<div className="flex bg-gray-100 p-4 rounded">
  <div className="flex-grow bg-indigo-500 text-white p-4 rounded">Grow</div>
  <div className="flex-none w-20 bg-indigo-500 text-white p-4 rounded mx-2">Fixed</div>
  <div className="flex-grow bg-indigo-500 text-white p-4 rounded">Grow</div>
</div>`}
        </pre>
        <p className="mt-4 text-gray-600">flex-grow 类使元素自动扩展占据剩余空间，flex-none 类保持元素原有尺寸。</p>
      </section>

      {/* 7. 间距设置示例 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-pink-600">间距设置</h2>
        <div className="flex gap-4 bg-gray-100 p-4 rounded">
          <div className="bg-pink-500 text-white p-4 rounded">Gap 1</div>
          <div className="bg-pink-500 text-white p-4 rounded">Gap 2</div>
          <div className="bg-pink-500 text-white p-4 rounded">Gap 3</div>
        </div>
        <pre className="mt-4 p-4 bg-gray-200 rounded text-sm text-gray-800">
          {`<div className="flex gap-4 bg-gray-100 p-4 rounded">
  <div className="bg-pink-500 text-white p-4 rounded">Gap 1</div>
  <div className="bg-pink-500 text-white p-4 rounded">Gap 2</div>
  <div className="bg-pink-500 text-white p-4 rounded">Gap 3</div>
</div>`}
        </pre>
        <p className="mt-4 text-gray-600">gap-4 类在 Flex 容器中的元素之间添加统一的间距，更容易控制元素间的空白。</p>
      </section>
    </div>
  )
}