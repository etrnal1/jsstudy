import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

export async function POST(request: Request) {
  try {
    // 从 URL 参数获取时间信息
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const duration = parseInt(url.searchParams.get('duration') || '0');

    if (!startTime || duration <= 0) {
      return NextResponse.json(
        { error: '无效的时间参数' },
        { status: 400 }
      );
    }

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'tmp');
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    const outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

    await require('fs').promises.mkdir(tempDir, { recursive: true });

    // 获取视频数据并写入临时文件
    const videoData = await request.arrayBuffer();
    await writeFile(inputPath, Buffer.from(videoData));

    // 处理视频
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(duration)
        .outputOptions([
          '-c:v libx264',     // 使用 H.264 编码
          '-c:a aac',         // 使用 AAC 音频编码
          '-strict experimental',
          '-movflags +faststart'  // 优化网络播放
        ])
        .output(outputPath)
        .on('start', (commandLine) => {
          console.log('FFmpeg 开始处理:', commandLine);
        })
        .on('progress', (progress) => {
          console.log('处理进度:', progress.percent, '%');
        })
        .on('end', () => {
          console.log('FFmpeg 处理完成');
          resolve(true);
        })
        .on('error', (err) => {
          console.error('FFmpeg 错误:', err);
          reject(err);
        })
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