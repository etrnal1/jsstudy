/**
 * 文章详情页面
 * 知识点：
 * 1. Markdown 渲染
 * 2. 样式优化
 * 3. 响应式设计
 * 4. 深色模式支持
 */

import { getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import React from "react";

import { marked } from "marked";
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      {/* 文章头部背景 */}
      <div className="bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-background pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* 返回按钮 */}
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>

          {/* 文章标题区 */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
            {post.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <time>{post.date}</time>
            </div>
            {post.tags && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 文章主体 */}
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
          {/* 文章描述 */}
          <div className="mb-12 text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-r">
            {post.description}
          </div>

          {/* Markdown 文章内容 */}
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: marked(post.content) }}
            />
          </div>

          {/* 文章底部 */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-4">分享文章</h2>
            <div className="flex gap-4">
              {/* 社交分享按钮 */}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}