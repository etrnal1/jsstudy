
import { getPostBySlug } from "@/data/posts"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex gap-4 text-muted-foreground">
              <time>{post.date}</time>
              {post.tags && (
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-sm bg-muted px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              {post.description}
            </p>
            {/* 如果content是Markdown格式，你可以使用react-markdown来渲染 */}
            <div className="whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}