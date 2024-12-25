import Link from 'next/link'

interface Post {
    id: string;
    title: string;
    content: string;
}

interface SearchResultsProps {
    searchResults: Post[];
    searchTerm: string;
    stripHtml: (html: string) => string;
}

export default function SearchResults({ searchResults, searchTerm, stripHtml }: SearchResultsProps) {
    if (!searchTerm) return null;

    return (
        <div className="w-full max-w-2xl mb-8">
            <h2 className="text-xl font-semibold mb-4">搜索结果: "{searchTerm}"</h2>
            {searchResults.length === 0 ? (
                <p className="text-gray-500">未找到相关结果</p>
            ) : (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    {searchResults.map((post) => (
                        <div key={post.id} className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
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
            )}
        </div>
    )
}