// app/api/video/cut/route.ts

import { NextResponse } from 'next/server';
import { writeFile, mkdir, stat, unlink } from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { PassThrough, Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

// 设置运行时为 Node.js
export const config = {
  runtime: 'nodejs',
};

export async function POST(request: Request) {
  const passThrough = new PassThrough();

  // 设置响应头
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    // 如果需要跨域，取消注释并根据需求调整
    // 'Access-Control-Allow-Origin': '*',
  };

  // 将 PassThrough 转换为 Web ReadableStream，并进行类型断言
  const webReadable = Readable.toWeb(passThrough) as ReadableStream<Uint8Array>;

  const response = new NextResponse(webReadable, { headers });

  let inputPath = '';
  let outputPath = '';

  try {
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const durationStr = url.searchParams.get('duration') || '0';
    const outputFormat = url.searchParams.get('outputFormat') || 'mp4'; // 默认格式为 mp4
    const resolution = url.searchParams.get('resolution') || '1280x720'; // 默认分辨率为 1280x720

    const duration = parseInt(durationStr, 10);

    console.log('开始处理视频请求:', { startTime, duration, outputFormat, resolution });

    // 验证输出格式
    const allowedFormats = ['mp4', 'avi', 'mkv', 'mov', 'flv'];
    if (!allowedFormats.includes(outputFormat.toLowerCase())) {
      throw new Error(`不支持的输出格式: ${outputFormat}`);
    }

    // 验证分辨率格式
    const resolutionMatch = resolution.match(/^(\d{3,4})x(\d{3,4})$/);
    if (!resolutionMatch) {
      throw new Error(`无效的分辨率格式: ${resolution}`);
    }

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    await mkdir(tempDir, { recursive: true });

    // 生成唯一文件名
    const uniqueId = uuidv4();
    inputPath = path.join(tempDir, `input-${uniqueId}.mp4`);
    outputPath = path.join(tempDir, `output-${uniqueId}.${outputFormat}`);

    // 处理 FormData
    const formData = await request.formData();
    const file = formData.get('video');

    if (!file || !(file instanceof Blob)) {
      throw new Error('没有收到有效的视频文件');
    }

    // 将文件内容转换为 Buffer 并写入文件
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(arrayBuffer));

    console.log('视频文件已保存:', inputPath);
    const stats = await stat(inputPath);
    console.log('输入文件大小:', stats.size);

    if (stats.size === 0) {
      throw new Error('输入文件大小为0');
    }

    // 构建 FFmpeg 命令
    const ffmpegArgs = [
      '-ss', startTime,
      '-i', inputPath,
      '-t', duration.toString(),
      '-vf', `scale=${resolution}`,
      '-c:v', 'libx264',
      '-c:a', 'aac',
      '-movflags', '+faststart',
      '-y', // 覆盖输出文件
      outputPath
    ];

    console.log('FFmpeg 命令:', `ffmpeg ${ffmpegArgs.join(' ')}`);

    // 执行 FFmpeg
    const ffmpeg = spawn('ffmpeg', ffmpegArgs);

    // 处理 FFmpeg 输出以获取进度
    ffmpeg.stderr.on('data', (data: Buffer) => {
      const message = data.toString();
      console.log('FFmpeg stderr:', message);

      // 解析 FFmpeg 的进度信息
      const timeMatch = message.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const seconds = parseFloat(timeMatch[3]);
        const elapsedSeconds = hours * 3600 + minutes * 60 + seconds;
        const progressPercent = duration > 0 ? Math.min((elapsedSeconds / duration) * 100, 100) : 0;

        // 发送进度更新到前端
        const progressData = {
          progress: Math.round(progressPercent),
        };
        passThrough.write(`data: ${JSON.stringify(progressData)}\n\n`);
      }
    });

    // 处理 FFmpeg 关闭事件
    await new Promise<void>((resolve, reject) => {
      ffmpeg.on('close', async (code) => {
        if (code === 0) {
          console.log('FFmpeg 处理完成');
          const outputFileName = path.basename(outputPath);
          const downloadUrl = `/temp/${outputFileName}`;

          // 发送完成状态和下载链接到前端
          const completeData = {
            status: 'complete',
            downloadUrl,
            progress: 100
          };
          passThrough.write(`data: ${JSON.stringify(completeData)}\n\n`);

          resolve();
        } else {
          console.error('FFmpeg 进程退出，代码:', code);
          const errorData = { error: `FFmpeg 进程退出，代码: ${code}` };
          passThrough.write(`data: ${JSON.stringify(errorData)}\n\n`);
          reject(new Error(`FFmpeg 进程退出，代码: ${code}`));
        }
      });

      ffmpeg.on('error', (err) => {
        console.error('FFmpeg 错误:', err);
        const errorData = { error: err.message };
        passThrough.write(`data: ${JSON.stringify(errorData)}\n\n`);
        reject(err);
      });
    });

  } catch (error: any) {
    console.error('处理错误:', error);
    const errorData = { error: error.message };
    passThrough.write(`data: ${JSON.stringify(errorData)}\n\n`);
  } finally {
    // 关闭流
    passThrough.end();

    // 清理临时输入文件
    if (inputPath) {
      await unlink(inputPath).catch(() => console.error('无法删除输入文件'));
    }
    // 不删除 outputPath，确保用户可以下载
    // 如果需要，可以设置一个定时任务在一段时间后删除，或者在下载后删除
  }

  return response;
}