
/**
 * History page component that fetches and displays blog posts
 * 
 * @component
 * @async
 * @returns {Promise<JSX.Element>} Renders a list of blog posts with titles
 * 
 * @example
 * // Usage in Next.js route
 * <Page />
 * 
 * @remarks
 * This component fetches blog post data from an external API and displays them in a list.
 * Each post title is styled with Tailwind CSS classes for red text, bold font, and margin/padding.
 * 
 * @throws {Error} Throws an error if the fetch request fails
 */
// 使用fetch api,组件换成异步函数，等待调用
//usseFormStatus 钩子在执行 action 时显示加载指示


export default async function Page(){
    // 使用hook
   
    //处理逻辑
    const data = await fetch('https://api.vercel.app/blog')
    
 // 解析返回后的javascript 对象
    const posts = await data.json()

    
    console.log("打印帖子",posts)
    // 处理页面
    return (
        <div>
            <h1></h1>
           
                 <ul>
                    {posts.map((post)=>(
                        
                        <li  className="mt-2 text-bold  p-2 hover:text-blue-500" key={post.id}>s{post.id}:  {post.title}</li>
                    ))

                    }
                  
               
                 </ul>
          
           
        </div>
    )
}