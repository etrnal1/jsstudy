import {getData} from './lib/getData'
import Nav from './nextjs/ui/ui_nav'
import Link from 'next/link';

// 显示结果
import SearchResultsWrapper from './nextjs/ui/SearchResultsWrapper';
export default async function Page({
    searchParams,
}:{
    searchParams:{page?: string}
}){
   const data=  await getData();
   console.log("获取页面数据: ",data);
   const limit_page= 5
   let currentPage=1 
   if(!searchParams.page){
    console.log("没有识别到页面数据")
   }else{
    console.log("else 页面没有数据")
    currentPage= Number(searchParams.page);
   }
   // 计算总页,进一法算出一共几页

   const totalPage = Math.ceil(data.length /limit_page )
  console.log("获取总页数: ",totalPage)

  // 过滤文本数据
  const stripHtml = (html:string)=>{
    return html?.replace(/<[^>]*>/g,'') || '' ;
  }
  // 获取当前页数据: 
    const pagePosts = data.slice(
        (currentPage -1) * limit_page,
        currentPage * limit_page

    )
  console.log("打印页面 ",currentPage)
  console.log("打印当前页面数据: ",pagePosts)
  

   
    return (
        <>
            <Nav />
          
            <div className="flex  flex-col justify-center items-center min-h-screen p-8">
                <h1 className="text-4xl font-bold mb-8">我的博客</h1>
                {/* 点击搜索按钮 */}
                <SearchResultsWrapper initialPosts ={pagePosts}
                
                
                />
                <div className='w-full max-w-2xl'>
                         {/* 分页控制 */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Link href={`/posts?page=1`} className='bg-blue-500 text-white rounded  hover:bg-red-400'>首页</Link>
                    {currentPage > 1 && (
                        <Link
                            href={`/posts?page=${currentPage - 1}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            上一页
                        </Link>
                    )}
                    
                    <span className="px-4 py-2">
                        第 {currentPage} 页，共 {totalPage} 页
                    </span>
                    
                    {currentPage < totalPage && (
                        <Link
                            href={`/posts?page=${currentPage + 1}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            下一页
                        </Link>
                    )}
                    <Link href={`/posts?page=${totalPage}`} className='bg-blue-500 text-white rounded  hover:bg-green-400 px-4 py-4'>尾页</Link>
                </div>

                </div>
                    
            </div>
            
        </>
       
    )
}