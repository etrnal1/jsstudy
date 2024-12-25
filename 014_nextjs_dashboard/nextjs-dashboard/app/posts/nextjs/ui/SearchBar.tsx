'use client'
import { useState } from 'react'

import Link from 'next/link';
interface Post {
    id: string;
    title: string;
    content: string;
}

export default function SearchBar() {
    const [keyWord,setKeyWord] = useState<String>('');
    const [posts, setPosts] = useState<Post[]>([]);
    const handleChange=(value)=>{
        console.log("cs")
      
        setKeyWord(value)
      
       
    }
    // 点击搜索
    const handleClick=()=>{
        if(keyWord=='')
        {
            alert("请填数据")
        }else{
            
        fetch('/posts/api/search',{
            headers:{
                'content-type':"application/json"
            },
            method:"POST",
            body: JSON.stringify({searchTerm:keyWord})
        })
        .then(response => response.json())
        .then(data => {
            if(data.code === 200) {
                setPosts(data.data);
            } else {
                alert('搜索失败，请重试');
            }
        })
        .catch(error => {
            console.error('搜索出错:', error);
            alert('搜索出错，请重试');
        });
    }
}
    // const handleSearch = (results: Post[]) => {
    //     setPosts([]);
    // }
    

    return (
        <div className="w-full max-w-2xl mx-auto">
         
           <div className="flex">
           <input 
                type="text"
                placeholder="请输入搜索内容..."
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                onChange={(e)=>setKeyWord(e.target.value)}
            />
            <button className="text-black-400 rounded bg-blue-500 shadow px-5 ml-4" onClick ={handleClick}>搜索</button>
           </div>
           
            
            {/* 显示搜索结果 */}
            {posts.length > 0 && (
                <div className="mt-8 space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="p-4 bg-white rounded-lg shadow">
                            <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                            <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                                {post.content.substring(0, 200)}
                                {post.content.length > 200 && '...'}
                            </p>
                            <Link
                                href={`/posts/first?id=${post.id}`}
                                className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
                            >
                                阅读更多 →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}