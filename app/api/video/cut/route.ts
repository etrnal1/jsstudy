import { NextResponse } from 'next/server';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';

export async function POST(request: Request) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  
  try {
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const duration = parseInt(url.searchParams.get('duration') || '0');

    console.log('开始处理视频请求:', { startTime, duration });

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'tmp');
    await mkdir(tempDir, { recursive: true });

    // 生成临时文件路径
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    const outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

    // 保存上传的视频到临时文件
    const arrayBuffer = await request.arrayBuffer();
    await writeFile(inputPath, Buffer.from(arrayBuffer));

    console.log('视频文件已保存:', inputPath);

    await new Promise((resolve, reject) => {
      let progress = 0;

      const command = ffmpeg(inputPath)
        .inputOptions([`-ss ${startTime}`])
        .duration(duration)
        .output(outputPath)
        .outputOptions([
          '-c:v copy',
          '-c:a copy',
          '-movflags +faststart'
        ]);

      // 添加所有事件监听器
      command.on('start', (commandLine) => {
        console.log('FFmpeg 开始处理:', commandLine);
        writer.write(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ status: 'start' })}\n\n`
          )
        );
      });

      command.on('progress', (progressData) => {
        progress = progressData.percent;
        console.log('处理进度:', progress);
        writer.write(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ progress })}\n\n`
          )
        );
      });

      command.on('stderr', (stderrLine) => {
        console.log('FFmpeg stderr:', stderrLine);
      });

      command.on('error', (err, stdout, stderr) => {
        console.error('FFmpeg 错误:', err);
        console.error('FFmpeg stdout:', stdout);
        console.error('FFmpeg stderr:', stderr);
        reject(err);
      });

      command.on('end', async (stdout, stderr) => {
        console.log('FFmpeg 处理完成');
        try {
          // 读取处理后的文件
          const outputBuffer = await require('fs').promises.readFile(outputPath);
          
          // 发送完成消息
          writer.write(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ 
                status: 'complete',
                data: outputBuffer.toString('base64')
              })}\n\n`
            )
          );
          
          // 清理临时文件
          await require('fs').promises.unlink(inputPath);
          await require('fs').promises.unlink(outputPath);
          
          writer.close();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });

      // 运行命令
      command.run();
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