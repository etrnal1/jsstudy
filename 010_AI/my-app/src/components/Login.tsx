import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { PostCard } from "@/components/PostCard"
import Link from 'next/link'
import { FEATURED_POSTS } from "@/data/posts"

// 将组件标记为客户端组件
export function Login() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section className="py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">欢迎来到我的技术博客</h1>
          <p className="text-xl text-muted-foreground mb-8">
            分享 Web 开发、React 生态和前端技术的最新见解
          </p>
          <Link href="/posts" className="inline-block">
            <Button size="lg">
              浏览所有文章
            </Button>
          </Link>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-bold mb-8">精选文章</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_POSTS.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug}
                className="block transition-transform hover:scale-105"
              >
                <PostCard {...post} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}