
import { getPost } from '@/app/lib/getData'
import { Suspense } from 'react'
import LoadingSkeleton from '@/app/ui/loading-skeleton'
import ErrorComponent from '@/app/ui/error-component'
import Link from 'next/link'
import { notFound } from 'next/navigation'
type Props= {
    searchParams: { id?: string }
}
export default async  function BlogPost({
    searchParams,
}: Props) {
    const postId = searchParams.id
    const post = await getPost(postId)
  
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                <div className="w-full max-w-3xl">
                    <Link 
                        href="/posts" 
                        className="text-blue-500 mb-8 inline-block hover:underline"
                    >
                        ← 返回博客列表
                    </Link>

                    <article className="prose lg:prose-xl">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="text-gray-500 mb-8">
                            发布于 {post.date}
                        </div>
                        <div 
                            className="prose prose-blue"
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />
                    </article>
                </div>
            </div>
        </Suspense>
    );
}