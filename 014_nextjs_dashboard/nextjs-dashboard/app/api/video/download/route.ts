import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const filePath = decodeURIComponent(url.pathname.replace('/api/video/download', ''));
    const fullPath = path.join(process.cwd(), 'tmp', path.basename(filePath));
    
    const fileBuffer = await readFile(fullPath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
      },
    });
  } catch (error) {
    console.error('下载错误:', error);
    return new NextResponse('文件不存在或无法访问', { status: 404 });
  }
}