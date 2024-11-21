// 容器 首字母大写,大驼峰原则
export default function SpacingPra(){
    return (
        <>
        {/* 添加容器 px-4 左右边距 0.25 *4  py-8 上下 0.25*8   2rem 32px  */}
        <div className="container mx-auto px-4 py-8 bg-gray-100">
       
        {/*  */}
        <h1 className="text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-3xl font-bold text-transparent bg-clip-text">
            间距与尺寸练习</h1>

        <section>
        <h2 className = "text-2xl font-semibold mb-6 text-blue-600">
            内边距(padding)
        </h2>
        <div className="space-y-6">
            <div className="p-4
            bg-gradient-to-r from-blue-100 to-blue-500
            rounded-lg
            shadow-md
            hover:shadow-md transition-shadow">

                {/* 添加边框 */}
                <div className="p-4 bg-white rounded border border-blue-400">所有方向内边距(1rem)</div>
            </div>
        </div>
        </section>

        </div>
           
        </>
    )
}