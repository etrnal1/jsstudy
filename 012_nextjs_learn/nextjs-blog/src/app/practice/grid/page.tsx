"use client";

export default function GridPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Grid 布局练习</h1>

      {/* 基础网格布局 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">基础网格布局</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded">1</div>
          <div className="bg-blue-500 text-white p-4 rounded">2</div>
          <div className="bg-blue-500 text-white p-4 rounded">3</div>
          <div className="bg-blue-500 text-white p-4 rounded">4</div>
          <div className="bg-blue-500 text-white p-4 rounded">5</div>
          <div className="bg-blue-500 text-white p-4 rounded">6</div>
        </div>
      </section>

      {/* 响应式网格 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">响应式网格</h2>
        {/* 
          响应式布局是通过Tailwind的断点前缀实现的:
          grid-cols-1: 默认情况下(小屏幕)是1列
          md:grid-cols-2: 中等屏幕(768px)及以上时变成2列
          lg:grid-cols-4: 大屏幕(1024px)及以上时变成4列
        */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-500 text-white p-4 rounded">响应式 1</div>
          <div className="bg-green-500 text-white p-4 rounded">响应式 2</div>
          <div className="bg-green-500 text-white p-4 rounded">响应式 3</div>
          <div className="bg-green-500 text-white p-4 rounded">响应式 4</div>
        </div>
      </section>

      {/* 网格跨列跨行 */}
      {/* 跨行跨列说明 */}
      {/* 跨行跨列解释说明 */}
      {/* 跨行跨列示例 */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-purple-600">跨行跨列布局</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* col-span-2: 跨越2列 */}
          <div className="bg-purple-500 text-white p-4 rounded col-span-2">
            跨越2列 (col-span-2)
          </div>
          <div className="bg-purple-500 text-white p-4 rounded">
            普通列
          </div>
          
          {/* row-span-2: 跨越2行 */}
          <div className="bg-purple-500 text-white p-4 rounded row-span-2">
            跨越2行<br/>(row-span-2)
          </div>
          <div className="bg-purple-500 text-white p-4 rounded">
            普通格子
          </div>
          <div className="bg-purple-500 text-white p-4 rounded">
            普通格子
          </div>
          <div className="bg-purple-500 text-white p-4 rounded">
            普通格子
          </div>
          <div className="bg-purple-500 text-white p-4 rounded">
            普通格子
          </div>
        </div>

        <div className="mt-6 space-y-4 text-gray-700">
          <p><code>col-span-2</code>: 让元素在水平方向跨越2个网格列</p>
          <p><code>row-span-2</code>: 让元素在垂直方向跨越2个网格行</p>
          <p>通过组合使用跨行和跨列,可以创建灵活的网格布局结构</p>
        </div>
      </section>
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">跨行跨列概念解释</h3>
        <div className="space-y-4">
          <p className="text-gray-700">在CSS Grid布局中,跨行跨列是指让一个网格项目占据多个网格单元格的能力:</p>
          
          {/* 跨列示例 */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">跨列(Column Span)</h4>
            <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center col-span-2">
                跨越2列(col-span-2)
              </div>
              <div className="bg-blue-200 text-blue-800 p-2 rounded text-center">
                1列
              </div>
              <div className="bg-blue-200 text-blue-800 p-2 rounded text-center">
                1列
              </div>
            </div>
          </div>

          {/* 跨行示例 */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">跨行(Row Span)</h4>
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-4 rounded">
              <div className="bg-green-500 text-white p-2 rounded text-center row-span-2">
                跨越2行<br/>(row-span-2)
              </div>
              <div className="bg-green-200 text-green-800 p-2 rounded text-center">
                普通格子
              </div>
              <div className="bg-green-200 text-green-800 p-2 rounded text-center">
                普通格子
              </div>
              <div className="bg-green-200 text-green-800 p-2 rounded text-center">
                普通格子
              </div>
              <div className="bg-green-200 text-green-800 p-2 rounded text-center">
                普通格子
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">提示:</span> 使用跨行跨列可以创建更复杂的布局,比如:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>突出显示重要内容</li>
                <li>创建不规则的网格布局</li>
                <li>优化空间利用</li>
              </ul>
            </p>
          </div>
        </div>
      </section>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-purple-600">跨行跨列说明</h3>
        <div className="space-y-4">
          <p className="text-gray-700">在Grid布局中,可以通过以下类来控制元素跨越的行数和列数:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><code className="bg-gray-100 px-2 py-1 rounded">col-span-2</code> - 元素跨越2列</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">col-span-3</code> - 元素跨越3列</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">row-span-2</code> - 元素跨越2行</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">row-span-3</code> - 元素跨越3行</li>
          </ul>
          <p className="text-gray-700">这些类可以让网格中的元素占据多个网格单元,从而创建更灵活的布局。</p>
        </div>
      </div>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">网格跨列跨行</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-500 text-white p-4 rounded col-span-2">跨越2列</div>
          <div className="bg-purple-500 text-white p-4 rounded">1列</div>
          <div className="bg-purple-500 text-white p-4 rounded row-span-2">跨越2行</div>
          <div className="bg-purple-500 text-white p-4 rounded">普通格子</div>
          <div className="bg-purple-500 text-white p-4 rounded">普通格子</div>
        </div>
      </section>

      {/* 自动网格 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">自动网格</h2>
        <div className="grid grid-cols-auto-fit gap-4">
          <div className="bg-red-500 text-white p-4 rounded">自动适应</div>
          <div className="bg-red-500 text-white p-4 rounded">自动适应</div>
          <div className="bg-red-500 text-white p-4 rounded">自动适应</div>
          <div className="bg-red-500 text-white p-4 rounded">自动适应</div>
        </div>
      </section>

      {/* 网格对齐 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">网格对齐</h2>
        {/* 
          这个div使用CSS Grid布局来创建一个网格系统:
          grid: 启用CSS Grid布局
          grid-cols-3: 创建3列网格
          gap-4: 设置网格项之间的间距为1rem (16px)
          place-items-center: 让网格项在其网格区域内水平和垂直居中对齐
          h-40: 设置容器高度为10rem (160px)
          bg-gray-100: 设置浅灰色背景
          rounded: 添加圆角边框

          子元素的类名解释:
          bg-indigo-500: 设置靛蓝色背景
          text-white: 设置白色文字
          p-4: 设置内边距为1rem (16px)
          rounded: 添加圆角边框
        */}
        <div className="grid grid-cols-3 gap-4 place-items-center h-40 bg-gray-100 rounded">
          <div className="bg-indigo-500 text-white p-4 rounded">居中对齐</div>
          <div className="bg-indigo-500 text-white p-4 rounded">居中对齐</div>
          <div className="bg-indigo-500 text-white p-4 rounded">居中对齐</div>
        </div>
      </section>
    </div>
  );
}

// export default function GridPracticePage()   {
//     return(
//         <>
//         <div className="grid grid-cols-4 gap-4 ">
//             <div className="text-white bg-pink-500 h-20">01</div>
//             <div className="text-white bg-pink-500">02</div>
//             <div className="text-white bg-pink-500">03</div>
//             <div className="text-white bg-pink-500">04</div>
//             <div className="text-white bg-pink-500">05</div>
//             <div className="text-white bg-pink-500">04</div>
//             <div className="text-white bg-pink-500">06</div>
//             <div className="text-white bg-pink-500">07</div>
//             <div className="text-white bg-pink-500">08</div>
//             <div className="text-white bg-pink-500">09</div>
//         </div>
//         <h2 className="text-2xl  font-semibold mt-10">grid row-span</h2>

//         {/* 
//           这个div使用CSS Grid布局来创建一个网格系统:
//           grid: 启用CSS Grid布局
//           grid-rows-3: 设置网格为3行
//           grid-flow-col: 设置网格自动布局方向为列方向，即新元素会按列排列
//           gap-4: 设置网格项之间的间距为1rem (16px)

//           子元素的类名解释:
//           row-span-3: 让元素跨越3行
//           col-span-2: 让元素跨越2列
//           row-span-2: 让元素跨越2行
          
//           背景颜色:
//           bg-pink-600/700: 粉色背景，数字越大颜色越深
//           bg-purple-600: 紫色背景
          
//           文字颜色:
//           text-white: 白色文字
//         */}

//         {/* 
//           让我来解释这个网格布局:

//           1. grid-rows-3: 创建了3行的网格
//           2. grid-flow-col: 设置自动布局方向为列向,意味着新元素会从上到下、从左到右填充

//           具体元素布局:
//           - 第一个div (04): 
//             - row-span-3 让它占据全部3行
//             - 所以它会占据最左边一整列的空间
          
//           - 第二个div (05):
//             - col-span-2 让它横向占据2列
//             - 它会被放在右边区域的顶部
          
//           - 第三个div (06):
//             - row-span-2 让它纵向占据2行
//             - col-span-2 让它横向占据2列
//             - 它会填充05下方的剩余空间

//           布局示意:
//           |  04  |  05  05  |
//           |  04  |  06  06  |
//           |  04  |  06  06  |
//         */}
//         <div className="grid grid-rows-4 grid-flow-col gap-4">
//             <div className="row-span-4 text-white bg-pink-600">04</div>
//             <div className="bg-purple-600 col-span-2 row-span-2">05</div>
//             <div className="bg-pink-700 row-span-2 col-span-2 ">06</div>
//         </div>
//         </>
//     )
// }