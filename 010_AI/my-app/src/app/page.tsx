import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { PostCard } from "@/components/PostCard"

const FEATURED_POSTS = [
  {
    title: "开始使用 Next.js",
    excerpt: "Next.js 是一个流行的 React 框架，让我们一起来学习如何使用它...",
    date: "2024-03-20",
    slug: "getting-started-with-nextjs"
  },
  {
    title: "Shadcn UI 介绍",
    excerpt: "Shadcn UI 是一个优秀的 UI 组件库，提供了丰富的组件和主题定制能力...",
    date: "2024-03-19",
    slug: "introduction-to-shadcn-ui"
  },
  // 更多文章...
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* 英雄区域 */}
        <section className="py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">欢迎来到我的技术博客</h1>
          <p className="text-xl text-muted-foreground mb-8">
            分享 Web 开发、React 生态和前端技术的最新见解
          </p>
          <Button size="lg">
            浏览所有文章
          </Button>
        </section>

        {/* 精选文章 */}
        <section className="py-10">
          <h2 className="text-2xl font-bold mb-8">精选文章</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_POSTS.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
