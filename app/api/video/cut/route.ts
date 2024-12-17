import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

export async function POST(request: Request) {
  try {
    // 使用 Request.blob() 替代 formData()
    const data = await request.blob();
    const contentType = request.headers.get('content-type') || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: '无效的内容类型' },
        { status: 400 }
      );
    }

    // 从 URL 参数获取时间信息
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const duration = url.searchParams.get('duration') || '0';

    // 创建临时文件
    const tempDir = path.join(process.cwd(), 'tmp');
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    const outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

    // 确保临时目录存在
    await require('fs').promises.mkdir(tempDir, { recursive: true });

    // 写入临时文件
    await writeFile(inputPath, Buffer.from(await data.arrayBuffer()));

    // 处理视频
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(duration)
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // 读取输出文件
    const outputBuffer = await require('fs').promises.readFile(outputPath);

    // 清理临时文件
    await require('fs').promises.unlink(inputPath);
    await require('fs').promises.unlink(outputPath);

    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="cut-video-${timestamp}.mp4"`
      }
    });

  } catch (error) {
    console.error('视频处理错误:', error);
    return NextResponse.json(
      { error: '视频处理失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 