import Link from 'next/link'
import { getData } from '../lib/getData'

export default async function PostsHome({
    searchParams,
}: {
    searchParams: { page?: string }
}) {
    const allPostsData = await getData()
    
    // 分页配置
    const ITEMS_PER_PAGE = 2
  
  // 第一次刷新的时候是不会有searchParams.page 这个属性的
    const currentPage =  Number(searchParams.page)||1
    console.log(searchParams)
   
    const totalPages = Math.ceil(allPostsData.length / ITEMS_PER_PAGE)
    
    // 获取当前页的数据
    const paginatedPosts = allPostsData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )
    
    // 过滤掉HTML标签,只显示纯文本
    const stripHtml = (html: string) => {
        return html?.replace(/<[^>]*>/g, '') || ''
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">我的博客</h1>
            <div className="w-full max-w-2xl">
                {/* 博客列表 */}
                <div className="space-y-4">
                    {paginatedPosts.map((post) => (
                        <div key={post.id} className="block p-6 bg-white rounded-lg shadow">
                            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                            {/* 显示纯文本内容预览,限制在100个字符 */}
                            <p className="text-gray-600 mb-2">
                                {stripHtml(post.content || '').substring(0, 100)}
                                {post.content && stripHtml(post.content).length > 100 ? '...' : ''}
                            </p>

                            <Link 
                                href={`/posts/first?id=${post.id}`}  // 使用查询参数传递文章ID
                                className="text-blue-500 hover:text-blue-700"
                                prefetch={true}
                            >
                                阅读更多 →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* 分页控制 */}
                <div className="flex justify-center space-x-4 mt-8">
                    {currentPage > 1 && (
                        <Link
                            href={`/posts?page=${currentPage - 1}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            上一页
                        </Link>
                    )}
                    
                    <span className="px-4 py-2">
                        第 {currentPage} 页，共 {totalPages} 页
                    </span>
                    
                    {currentPage < totalPages && (
                        <Link
                            href={`/posts?page=${currentPage + 1}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            下一页
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}