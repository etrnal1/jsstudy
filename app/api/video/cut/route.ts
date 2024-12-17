import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { mkdir as fsMkdir } from 'fs/promises';
import { stat } from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

export async function POST(request: Request) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  let inputPath = '';
  let outputPath = '';

  const writeToStream = async (data: any) => {
    await writer.write(
      new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`)
    );
  };
  
  try {
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const duration = parseInt(url.searchParams.get('duration') || '0');

    console.log('开始处理视频请求:', { startTime, duration });

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'tmp');
    await fsMkdir(tempDir, { recursive: true });

    // 生成临时文件路径
    const timestamp = Date.now();
    inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

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
    const ffmpegCommand = `ffmpeg -ss ${startTime} -i ${inputPath} -t ${duration} -c:v libx264 -c:a aac -movflags +faststart -y ${outputPath}`;
    console.log('FFmpeg 命令:', ffmpegCommand);

    // 执行 FFmpeg
    const ffmpeg = spawn('ffmpeg', [
      '-ss', startTime,
      '-i', inputPath,
      '-t', duration.toString(),
      '-c:v', 'libx264',
      '-c:a', 'aac',
      '-movflags', '+faststart',
      '-y',
      outputPath
    ]);

    // 处理进度
    ffmpeg.stderr.on('data', (data) => {
      console.log('FFmpeg stderr:', data.toString());
      writeToStream({ progress: 50 }); // 这里可以添加实际的进度计算
    });

    // 等待处理完成
    await new Promise((resolve, reject) => {
      ffmpeg.on('close', async (code) => {
        if (code === 0) {
          console.log('FFmpeg 处理完成');
          // 生成下载链接
          const downloadUrl = `/tmp/output-${timestamp}.mp4`;
          await writeToStream({ 
            status: 'complete',
            downloadUrl,
            progress: 100 
          });
          resolve(null);
        } else {
          console.error('FFmpeg 进程退出，代码:', code);
          reject(new Error(`FFmpeg 进程退出，代码: ${code}`));
        }
      });

      ffmpeg.on('error', (err) => {
        console.error('FFmpeg 错误:', err);
        reject(err);
      });
    });

    await writer.close();
    return new NextResponse(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('处理错误:', error);
    await writeToStream({ error: error.message });
    await writer.close();
    return new NextResponse(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
}