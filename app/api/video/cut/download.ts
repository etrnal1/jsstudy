import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filePath = url.searchParams.get('file');

  if (!filePath) {
    return new Response('File not specified', { status: 400 });
  }

  const resolvedPath = path.resolve(filePath);

  try {
    const fileStream = createReadStream(resolvedPath);
    return new Response(fileStream, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${path.basename(resolvedPath)}"`,
      },
    });
  } catch (error) {
    console.error('文件下载错误:', error);
    return new Response('File not found', { status: 404 });
  }
}
