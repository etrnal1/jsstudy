import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: markdown } = matter(content);

    return NextResponse.json({
      slug: params.slug,
      title: data.title,
      date: data.date,
      tags: data.tags,
      content: markdown,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
}