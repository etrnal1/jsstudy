import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { TransformStream } from 'stream/web'; // 确保导入 TransformStream

export async function POST(request: Request) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  try {
    console.log("获取数据打印", new Date());

    // 使用 arrayBuffer 读取整个请求体
    const arrayBuffer = await request.arrayBuffer();
    // 发现命令没有执行，检查，传递过来的传输体 是否有相应长度.
    const buffer = Buffer.from(arrayBuffer);
    console.log("请求体长度:", buffer.length);
    //return 0;
    // 获取参数
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const duration = parseInt(url.searchParams.get('duration') || '0');

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'tmp');
    await require('fs').promises.mkdir(tempDir, { recursive: true });

    // 生成临时文件路径
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    const outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

    // 将缓冲区写入输入文件
    await writeFile(inputPath, buffer);
    console.log("输入文件已写入:", inputPath);

    // 后台打印 ffmpeg 命令
    console.log('FFmpeg 开始处理:', `ffmpeg -ss ${startTime} -i ${inputPath} -y -t ${duration} -c:v libx264 -c:a aac -strict experimental -movflags +faststart ${outputPath}`);

    await new Promise<void>((resolve, reject) => {
      ffmpeg()
        .input(inputPath)
        .setStartTime(startTime)
        .setDuration(duration)
        .outputOptions([
          '-c:v libx264',  // 重新编码视频流为 H.264
          '-c:a aac',      // 重新编码音频流为 AAC
          '-movflags +faststart'
        ])
        .output(outputPath)
        .on('start', (commandLine) => {
          console.log('FFmpeg 命令行:', commandLine);
        })
        .on('progress', (progress) => {
          console.log("打印处理进度....", progress, new Date());
          writer.write(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ progress: progress.percent })}\n\n`
            )
          );
        })
        .on('end', async () => {
          try {
            console.log("FFmpeg 处理完成");
            const outputBuffer = await require('fs').promises.readFile(outputPath);
            await require('fs').promises.unlink(outputPath);
            await require('fs').promises.unlink(inputPath); // 清理输入文件
            writer.close(); // 关闭写入器
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (err, stdout, stderr) => {
          console.error('FFmpeg 错误:', err);
          console.error('FFmpeg 标准输出:', stdout);
          console.error('FFmpeg 错误输出:', stderr);
          reject(err);
        })
        .run();
    });

    return new Response(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('视频处理错误:', error);
    writer.write(
      new TextEncoder().encode(
        `data: ${JSON.stringify({ error: (error as Error).message })}\n\n`
      )
    );
    writer.close();

    return new Response(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
}