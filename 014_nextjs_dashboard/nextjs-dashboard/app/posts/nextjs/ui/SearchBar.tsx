'use client';
// 用户输入相关关键词,调用api,返回结果给父组件
import { useState } from 'react';

interface SearchBarProps {
    onSearch: (results: any[]) => void;
    onSearchStateChange?: (isSearching: boolean) => void;
}

export default function SearchBar({ onSearch, onSearchStateChange }: SearchBarProps) {
    const [keyWord, setKeyWord] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchResults = async () => {
        if (!keyWord.trim()) {
            setError('请输入搜索内容');
            onSearch([]); // 清空结果
            return;
        }

        setIsLoading(true);
        setError('');
        onSearchStateChange?.(true);

        try {
            const response = await fetch('/posts/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm: keyWord.trim() }),
            });

            const data = await response.json();
            if (data.code === 200) {
                onSearch(data.data); // 返回搜索结果
            } else {
                setError(data.message || '搜索失败');
                onSearch([]);
            }
        } catch (err) {
            setError('搜索过程中发生错误');
            onSearch([]);
        } finally {
            setIsLoading(false);
            onSearchStateChange?.(false);
        }
    };
    const handleKey=()=>{
        fetchResults()
    }
    const handleSearch = () => {
        fetchResults();
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* 添加enter键触发 */}
            <input
                type="text"
                placeholder="输入关键词搜索文章..."
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                onKeyDown={(e)=>{if(e.key=="Enter"){ fetchResults();}}}
                disabled={isLoading}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={handleSearch}
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg"
                disabled={isLoading || !keyWord.trim()}
            >
                {isLoading ? '搜索中...' : '搜索'}
            </button>
        </div>
    );
}