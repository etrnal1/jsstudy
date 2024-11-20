import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = await context.params;

    const postsDir = path.join(process.cwd(), 'posts');
    const files = await fs.readdir(postsDir);
    
    // 查找匹配 slug 的文件
    const postFile = files.find(file => file.startsWith(slug) || file.includes(slug));
    
    if (!postFile) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const filePath = path.join(postsDir, postFile);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: markdown } = matter(content);

    const post = {
      slug: postFile.replace('.md', ''),
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      content: markdown
    };

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = await context.params;

    const body = await request.json();

    return NextResponse.json({ 
      success: true,
      slug: slug
    });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' }, 
      { status: 500 }
    );
  }
}
