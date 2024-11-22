export default function GridPracticePage()   {
    return(
        <>
        <div className="grid grid-cols-4 gap-4 ">
            <div className="text-white bg-pink-500 h-20">01</div>
            <div className="text-white bg-pink-500">02</div>
            <div className="text-white bg-pink-500">03</div>
            <div className="text-white bg-pink-500">04</div>
            <div className="text-white bg-pink-500">05</div>
            <div className="text-white bg-pink-500">04</div>
            <div className="text-white bg-pink-500">06</div>
            <div className="text-white bg-pink-500">07</div>
            <div className="text-white bg-pink-500">08</div>
            <div className="text-white bg-pink-500">09</div>
            
        </div>
        <h2 className="text-2xl  font-semibold mt-10">grid row-span</h2>

        {/* 
          这个div使用CSS Grid布局来创建一个网格系统:
          grid: 启用CSS Grid布局
          grid-rows-3: 设置网格为3行
          grid-flow-col: 设置网格自动布局方向为列方向，即新元素会按列排列
          gap-4: 设置网格项之间的间距为1rem (16px)

          子元素的类名解释:
          row-span-3: 让元素跨越3行
          col-span-2: 让元素跨越2列
          row-span-2: 让元素跨越2行
          
          背景颜色:
          bg-pink-600/700: 粉色背景，数字越大颜色越深
          bg-purple-600: 紫色背景
          
          文字颜色:
          text-white: 白色文字
        */}

        {/* 
          让我来解释这个网格布局:

          1. grid-rows-3: 创建了3行的网格
          2. grid-flow-col: 设置自动布局方向为列向,意味着新元素会从上到下、从左到右填充

          具体元素布局:
          - 第一个div (04): 
            - row-span-3 让它占据全部3行
            - 所以它会占据最左边一整列的空间
          
          - 第二个div (05):
            - col-span-2 让它横向占据2列
            - 它会被放在右边区域的顶部
          
          - 第三个div (06):
            - row-span-2 让它纵向占据2行
            - col-span-2 让它横向占据2列
            - 它会填充05下方的剩余空间

          布局示意:
          |  04  |  05  05  |
          |  04  |  06  06  |
          |  04  |  06  06  |
        */}
        <div className="grid grid-rows-4 grid-flow-col gap-4">
            <div className="row-span-4 text-white bg-pink-600">04</div>
            <div className="bg-purple-600 col-span-2 row-span-2">05</div>
            <div className="bg-pink-700 row-span-2 col-span-2 ">06</div>
        </div>
        </>
    )
}