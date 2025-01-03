// 大数据看板模块
'use client'

// 封装成chartBar 组件
import ChartBar from '../nextjs/ui/ChartBar'
export default function AboutPage(){
    
    return (
       <div className='flex h-screen'>
        <div className="bg-white-500 p-6 flex-1">
          <ChartBar />
            
        </div>
       
        
       </div>
    )
}