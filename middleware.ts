import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 允许大文件上传的配置
  return NextResponse.next({
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  });
}

export const config = {
  matcher: '/api/video/cut',
}; 