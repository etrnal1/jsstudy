// app/api/video/cut/route.ts

import { NextResponse } from 'next/server';
import { writeFile, mkdir, stat, unlink } from 'fs/promises';
import path from 'path';
<<<<<<< HEAD
import { spawn } from 'child_process';

// 使用 Web Streams API 而不是 polyfill
const TransformStream = globalThis.TransformStream;

export async function POST(request: Request) {
  // 创建一个 TransformStream 来发送 SSE 数据
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  // 定义一个函数来写入 SSE 格式的数据
  const writeToStream = async (data: any) => {
    const sseData = `data: ${JSON.stringify(data)}\n\n`;
    await writer.write(new TextEncoder().encode(sseData));
  };

  try {
    // 解析请求 URL 和参数
=======
import ffmpeg from 'fluent-ffmpeg';

export async function POST(request: Request) {
  try {
    // 从 URL 参数获取时间信息
>>>>>>> parent of 9c8f3e5 (添加进度条，以及其他处理视频的能力)
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const durationParam = url.searchParams.get('duration');
    const duration = durationParam ? parseInt(durationParam, 10) : 0;

<<<<<<< HEAD
    console.log('开始处理视频请求:', { startTime, duration });

    // 创建临时目录（public/temp）
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    await mkdir(tempDir, { recursive: true });

    // 生成输入和输出文件路径
=======
    if (!startTime || duration <= 0) {
      return NextResponse.json(
        { error: '无效的时间参数' },
        { status: 400 }
      );
    }

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'tmp');
>>>>>>> parent of 9c8f3e5 (添加进度条，以及其他处理视频的能力)
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    const outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

<<<<<<< HEAD
    // 解析 FormData
    const formData = await request.formData();
    const file = formData.get('video');

    if (!file || !(file instanceof Blob)) {
      throw new Error('没有收到有效的视频文件');
    }

    // 将上传的文件写入输入路径
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(arrayBuffer));

    console.log('视频文件已保存:', inputPath);
    const stats = await stat(inputPath);
    console.log('输入文件大小:', stats.size);

    if (stats.size === 0) {
      throw new Error('输入文件大小为0');
    }

    // 确保持续时间有效
    if (duration <= 0) {
      throw new Error('持续时间必须大于0');
    }

    // 构建 FFmpeg 命令参数
    const ffmpegArgs = [
      '-ss', startTime,
      '-i', inputPath,
      '-t', duration.toString(),
      '-c:v', 'libx264',
      '-c:a', 'aac',
      '-movflags', '+faststart',
      '-y',
      outputPath
    ];

    console.log('FFmpeg 命令:', 'ffmpeg', ffmpegArgs.join(' '));

    // 启动 FFmpeg 进程
    const ffmpeg = spawn('ffmpeg', ffmpegArgs);

    // 总时长用于进度计算
    const totalSeconds = duration;

    // 辅助函数：将时间字符串转换为秒数
    const timeToSeconds = (timeStr: string): number => {
      const [hours, minutes, seconds] = timeStr.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    // 监听 FFmpeg 的 stderr 输出，解析进度
    ffmpeg.stderr.on('data', (data) => {
      const message = data.toString();
      console.log('FFmpeg stderr:', message);

      // 使用正则表达式提取当前处理时间
      const timeMatch = message.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d+)/);
      if (timeMatch) {
        const currentTimeStr = `${timeMatch[1]}:${timeMatch[2]}:${timeMatch[3]}`;
        const currentSeconds = timeToSeconds(currentTimeStr);
        const progress = Math.min(100, Math.round((currentSeconds / totalSeconds) * 100));

        // 发送进度更新
        writeToStream({ progress });
      } else if (message.includes('kb/s')) {
        // 当检测到编码完成时发送100%进度
        writeToStream({ progress: 100 });
      }
    });

    // 等待 FFmpeg 进程完成
    await new Promise<void>((resolve, reject) => {
      ffmpeg.on('close', async (code) => {
        if (code === 0) {
          console.log('FFmpeg 处理完成');
          const outputFileName = path.basename(outputPath);
          const downloadUrl = `/temp/${outputFileName}`;
          console.log('生成的下载链接:', downloadUrl);

          // 发送完成消息
          await writeToStream({
            status: 'complete',
            downloadUrl,
            progress: 100
          });

          // 清理输入文件
          try {
            await unlink(inputPath);
            console.log('输入文件已删除:', inputPath);
          } catch (err) {
            console.error('删除输入文件失败:', err);
          }

          resolve();
        } else {
          console.error('FFmpeg 进程退出，代码:', code);
          await writeToStream({
            error: `FFmpeg 进程退出，代码: ${code}`,
            progress: 0
          });

          // 清理输入文件
          try {
            await unlink(inputPath);
            console.log('输入文件已删除:', inputPath);
          } catch (err) {
            console.error('删除输入文件失败:', err);
          }

          reject(new Error(`FFmpeg 进程退出，代码: ${code}`));
        }
      });

      ffmpeg.on('error', async (err) => {
        console.error('FFmpeg 错误:', err);
        await writeToStream({
          error: 'FFmpeg 进程启动失败',
          progress: 0
        });

        // 清理输入文件
        try {
          await unlink(inputPath);
          console.log('输入文件已删除:', inputPath);
        } catch (err) {
          console.error('删除输入文件失败:', err);
        }

        reject(err);
      });
    });

    // 关闭 writer
    await writer.close();

    // 返回 SSE 响应
    return new NextResponse(responseStream.readable, {
=======
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
>>>>>>> parent of 9c8f3e5 (添加进度条，以及其他处理视频的能力)
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="cut-video-${timestamp}.mp4"`
      }
    });

<<<<<<< HEAD
  } catch (error: any) {
    console.error('处理错误:', error);

    // 发送错误消息
    try {
      await writeToStream({
        error: error.message,
        progress: 0
      });
    } catch (err) {
      console.error('写入错误信息失败:', err);
    }

    // 关闭 writer
    await writer.close();

    // 返回 SSE 响应
    return new NextResponse(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
=======
  } catch (error) {
    console.error('视频处理错误:', error);
    return NextResponse.json(
      { error: '视频处理失败: ' + (error as Error).message },
      { status: 500 }
    );
>>>>>>> parent of 9c8f3e5 (添加进度条，以及其他处理视频的能力)
  }
}