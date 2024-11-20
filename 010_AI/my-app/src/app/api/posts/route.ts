import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// 获取文章列表
export async function GET() {
  try {
    const postsDir = path.join(process.cwd(), 'posts');
    const files = await fs.readdir(postsDir);
    
    const posts = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(postsDir, filename);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdown } = matter(content);
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title,
          date: data.date,
          tags: data.tags,
          excerpt: markdown.slice(0, 200) + '...',
        };
      })
    );

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// 创建新文章
export async function POST(request: Request) {
  try {
    const { title, content, tags } = await request.json();

    // 创建 markdown 内容
    const markdown = `---
title: ${title}
date: ${new Date().toISOString()}
tags: [${tags.join(', ')}]
---

${content}
`;

    // 创建文件名（使用标题生成）
    const fileName = `${new Date().getTime()}-${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    
    // 确保posts目录存在
    const postsDir = path.join(process.cwd(), 'posts');
    await fs.mkdir(postsDir, { recursive: true });

    // 写入文件
    await fs.writeFile(
      path.join(postsDir, fileName),
      markdown,
      'utf-8'
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}