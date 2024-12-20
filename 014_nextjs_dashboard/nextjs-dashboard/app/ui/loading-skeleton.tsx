export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl">
                {/* 标题骨架 */}
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-8 animate-pulse"></div>
                
                {/* 文章列表骨架 */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div 
                            key={item} 
                            className="p-4 rounded-lg shadow"
                        >
                            {/* 文章标题骨架 */}
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                            
                            {/* 日期骨架 */}
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                            
                            {/* 内容骨架 */}
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}