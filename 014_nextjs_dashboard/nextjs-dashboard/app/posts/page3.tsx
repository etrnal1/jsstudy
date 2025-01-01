'use client'
import Link from 'next/link'
import {getData} from './lib/getData'
import Nav from './nextjs/ui/ui_nav'
import SearchBar from './nextjs/ui/SearchBar'


export default async function PostsHome({
    searchParams,
}: {
    searchParams: { page?: string }
}) {
    // const [isSearching, setIsSearching] = useState(false);
    // const [posts, setPosts] = useState<any[]>([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const allPostsData = await getData()
    
    return 0;
    // 分页配置
    const ITEMS_PER_PAGE = 5
  // 第一次刷新的时候是不会有searchParams.page 这个属性的
    let currentPage = 1;
  if (!searchParams?.page) {
    currentPage = 1;
  } else {
    currentPage = Number(searchParams.page);
  }
   
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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
       
    }
    // 计算当前页的文章
  
    return (
        <>
            <Nav /> 
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                <h1 className="text-4xl font-bold mb-8">我的博客</h1>
                
                {/* <SearchBar onSearchStateChange={setIsSearching} /> */}

                {/* 只在非搜索状态下显示所有文章列表 */}
               
                    <div className="w-full max-w-2xl">
                        <div className="space-y-4">
                            {paginatedPosts.map((post) => (
                                <div key={post.id} className="block p-6 bg-white rounded-lg shadow">
                                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                                    <p className="text-gray-600 mb-2">
                                        {stripHtml(post.content || '').substring(0, 100)}
                                        {post.content && stripHtml(post.content).length > 100 ? '...' : ''}
                                    </p>
                                    <Link 
                                        href={`/posts/first?id=${post.id}`}
                                        className="text-blue-500 hover:text-blue-700"
                                        prefetch={true}
                                    >
                                        阅读更多 →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                
            </div>
        </>
    );
}