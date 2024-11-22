// 容器 首字母大写,大驼峰原则
import { Button } from "@/components/ui/button";
import Link from  "next/link";
export default function SpacingPra() {
  return (
    <>
      {/* 添加容器 px-4 左右边距 0.25 *4  py-8 上下 0.25*8   2rem 32px  */}
      <div className="container mx-auto px-4 py-8 bg-gray-100">
        {/*  */}
        <h1 className="text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-3xl font-bold text-transparent bg-clip-text">
          间距与尺寸练习
        </h1>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">
            内边距(padding)
          </h2>
          {/* 内边距开始 */}
          <div className="space-y-6">
            <div
              className="p-4
            bg-gradient-to-r from-blue-100 to-blue-500
            rounded-lg
            shadow-md
            hover:shadow-md transition-shadow"
            >
              {/* 添加边框 */}
              <div className="p-4 bg-white rounded border border-blue-400">
                所有方向内边距(1rem)
              </div>
            </div>
          </div>
          {/* 内边边距 */}

          <h2 className="text-2xl font-semibold mt-12 mb-6 text-blue-600">
            水平方向边距
          </h2>

          {/* <h2 className = "text-2xl font-semibold mb-6 text-blue-600">
            内边距(padding)
        </h2> */}

          {/* md margin  */}
          {/* px padding-left padding-right 1rem 16px */}
          <div className="border px-4 shadow-md  rounded-lg border-purple-500">
            <div className="p-4 bg-white rounded border border-blue-800">
              px-4 水平内边距(1rem)(16px)
            </div>
          </div>
          {/* 1.5rem 24px 1xl 等于12px  */}
          {/* mt-12 3rem 48px  mt-1 4px
        rounde-lg 0.5rem
        8px */}

          {/* 1 *4  换算完就是 px  */}
          <h2
            className="text-2xl
        border-blue-600
        font-semibold mt-12 
        transition-shadow"
          >
            垂直内边距
          </h2>

          <div
            className="py-4 rounded-lg border border-purple-900 shadow-sm  transition-shadow"
          >
                <div
                className="border bg-white
                rounded 
                border-blue-200"
                >
                垂直内边距 4 (1rem)
                </div>
          </div>

          <h2>外边距练习</h2>

          <div className="mb-12 p-6 rounded-lg shadow-md">

            <div>
                m-4 所有方向外边4
            </div>
          </div>
          {/* 1.5 rem 24px */}
         
        </section>
        {/* padding 6  24px  ][p1 ===4 ] 背景颜色为白色 bg  */}
        <section className="p6 bg-white rounded-lg shadow-emerald-600">
            {/* 2xl 字体大小 24px line-height [行高] */}
        <h2 className="text-green-600 text-2xl">尺寸练习模块</h2>
        {/* 垂直 24px y-y 确保每个元素都有合适的空间 space y 垂直方向之间的间隔  */}
        <div className="space-y-6">
            <div className="space-y-2">
                {/* mb-2 margin-bottom 8px */}
                <p className="text-sm text-green-100 mb-2">宽度示例</p>
                {/* 展示100%宽度 */}
                <div className="w-full bg-green-400">
                    w-full 100% 宽度

                </div>
                {/* 展示50%的宽度 */}
                <div className="w-1/2 bg-orange-700">
                    w-1/2 50% 宽度
                </div>

                <div className="w-1/4 bg-orange-500">
                    w-1/4 25%宽度
                </div>
            </div>
            {/* 高度区域示例  14px lineheight  20px*/}
        <div className="mt-8">
            <p className="text-2xl font-semibold text-gray-600 mb-2">
                高度示范例子
            </p>
            {/* 4*4 16px */}
            <div className="flex spacex-4 h-40 ">
                
                <div className="w-1/4 h-full bg-green-700" >
                    h-full (全高)
                </div>

                {/* div 区域 */}

                <div className="w-1/4 h-3/4 border bg-green-800 shadow-sm">
                    h-3/4 四分之三高
                    
                </div>

                 {/* div 区域 */}

                
            </div>
            {/* 1xl 12px  */}
          
           
        </div>

        </div>
        </section>


       
        <section>
        <h2 className="text-2xl mb-2 mt-2 font-semibold">间距比例尺</h2>
        <div className="space-y-4">
            {[1,2,3,4].map((size)=>(
                <div key={size} className="flex item-center">
                    <div className="w-20 text-sm text-gray-600">
                        p-{size}
                        
                    </div>
                    <div className={`p-${size}
                    bg-green-600` }>
                        间距示例
                    </div>
                </div>

            ))}
           测试
        </div>
        </section>
     <Button >
     <Link href="/">返回首页</Link>
           
     </Button>

      </div>
    </>
  );
}
