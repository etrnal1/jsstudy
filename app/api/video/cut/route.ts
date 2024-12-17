import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const startTime = formData.get('startTime') as string;
    const duration = formData.get('duration') as string;

    if (!videoFile) {
      return NextResponse.json(
        { error: '没有上传视频文件' },
        { status: 400 }
      );
    }

    // 生成安全的文件名（只使用时间戳）
    const timestamp = Date.now();
    const inputFileName = `input-${timestamp}.mp4`;
    const outputFileName = `output-${timestamp}.mp4`;

    // 创建临时文件路径
    const tempDir = path.join(process.cwd(), 'tmp');
    const inputPath = path.join(tempDir, inputFileName);
    const outputPath = path.join(tempDir, outputFileName);

    // 确保临时目录存在
    await require('fs').promises.mkdir(tempDir, { recursive: true });

    // 将上传的文件写入临时文件
    const bytes = await videoFile.arrayBuffer();
    await writeFile(inputPath, Buffer.from(bytes));

    // 使用 FFmpeg 处理视频
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(duration)
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // 读取处理后的视频
    const outputBuffer = await require('fs').promises.readFile(outputPath);

    // 清理临时文件
    await require('fs').promises.unlink(inputPath);
    await require('fs').promises.unlink(outputPath);

    // 生成安全的下载文件名（移除特殊字符）
    const safeFileName = `cut_video_${timestamp}.mp4`;

    // 返回处理后的视频
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${safeFileName}"`
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