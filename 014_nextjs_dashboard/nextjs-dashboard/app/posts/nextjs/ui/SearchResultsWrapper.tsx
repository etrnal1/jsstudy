'use client';
// SearchResultsWrapper 组件负责：
	// •	通过 useState 管理搜索结果。
	// •	显示搜索结果或初始分页数据。
import { useState } from 'react';
import SearchBar from './SearchBar';

interface Post {
    id: string;
    title: string;
    content?: string;
    date: string;
    tags?: string[];
}

export default function SearchResultsWrapper({ initialPosts }: { initialPosts: Post[] }) {
    const [searchResults, setSearchResults] = useState<Post[] | null>(null); // 管理搜索结果
    const [isSearching, setIsSearching] = useState(false); // 搜索状态
    const stripHtml = (html:string)=>{
        return html?.replace(/<[^>]*>/g,'') || '' ;
      }
    const handleSearchResults = (results: Post[]) => {
        setSearchResults(results); // 更新搜索结果
    };

    const handleSearchStateChange = (isSearching: boolean) => {
        setIsSearching(isSearching); // 更新搜索状态
    };

    const postsToRender = searchResults || initialPosts; // 优先显示搜索结果

    return (
        <>
        {/* 把父组件的回调函数传递给子组件,通过useState来存储结果 */}
            <SearchBar
                onSearch={handleSearchResults}
                onSearchStateChange={handleSearchStateChange}
            />
            {isSearching && <p>正在搜索...</p>}
            <div className="w-full max-w-2xl mt-8">
                <h4>搜索结果: {postsToRender.length} 条,耗时0.2ms</h4>
                {postsToRender.map((post) => (
                    <div className="block p-6 bg-white rounded-lg shadow" key={post.id}>
                        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                        <span>日期: {post.date}</span>
                        <p className="text-gray-600 mb-2">
                        {stripHtml(post.content||'').substring(0,200)}
                        {post.content && stripHtml(post.content).length >200?'...':''}
                        
                          
                        </p>
                        <a
                            href={`/posts/first?id=${post.id}`}
                            className="text-blue-500 hover:text-blue-900"
                        >
                            阅读更多
                        </a>
                    </div>
                ))}
                
            </div>
        </>
    );
}