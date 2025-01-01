// 导入查询数据的程序
import { getPost } from '@/app/lib/getData1'
import { Suspense } from 'react'
import LoadingSkeleton from '@/app/ui/loading-skeleton'
import ErrorComponent from '@/app/ui/error-component'
import Link from 'next/link'
import { notFound } from 'next/navigation'
export default async function Page({params}){

    //编写逻辑 获取信息ß
    const paramId =  params.id
    if (!paramId) {
        throw new Error("Parameter 'id' is required.");
    }
    console.log('打印参数: ',paramId)
    const  data = await getPost(decodeURIComponent(paramId));
    console.log("打印查询到的数据ß",data)
    if(data==null){
        return 404 
    }

    return (
        <Suspense fallback={<LoadingSkeleton />}>
             <div className="flex flex-col items-center justify-center min-h-screen p-8">

                <div>
                    {data.title}
                 
                    
                </div>
                <article className="prose lg:prose-xl">
                        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                        <div className="text-gray-500 mb-8">
                            发布于 {data.date}
                        </div>
                        <div 
                            className="prose prose-blue"
                            dangerouslySetInnerHTML={{ __html: data.content || '' }}
                        />
                    </article>
             </div>
      
      
        
       
        </Suspense>
      
)
}