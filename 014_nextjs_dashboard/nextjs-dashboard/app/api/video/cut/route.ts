import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { PassThrough, Readable } from 'stream';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir, stat, unlink, writeFile } from 'fs/promises';

// 设置运行时为 Node.js
export const config = {
  api: {
    bodyParser: false,
  },
};

async function saveVideoFromStream(request: Request, filePath: string): Promise<void> {
  const arrayBuffer = await request.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // 查找视频数据的起始和结束位置
  const contentType = request.headers.get('content-type') || '';
  const boundary = contentType.split('boundary=')[1];
  
  if (!boundary) {
    throw new Error('No boundary found in content-type');
  }

  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const endBoundaryBuffer = Buffer.from(`--${boundary}--`);
  
  let start = buffer.indexOf(Buffer.from('\r\n\r\n')) + 4;
  const end = buffer.indexOf(endBoundaryBuffer) - 2;
  
  if (start === -1 || end === -1) {
    throw new Error('Invalid multipart form data');
  }

  const videoBuffer = buffer.slice(start, end);
  await writeFile(filePath, videoBuffer);
}

export async function POST(request: Request) {
  const passThrough = new PassThrough();
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  const webReadable = Readable.toWeb(passThrough) as ReadableStream<Uint8Array>;
  const response = new NextResponse(webReadable, { headers });

  let inputPath = '';
  let outputPath = '';

  try {
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const durationStr = url.searchParams.get('duration') || '0';
    const outputFormat = url.searchParams.get('outputFormat') || 'mp4';
    const resolution = url.searchParams.get('resolution') || '1280x720';
    const duration = parseInt(durationStr, 10);

    // 创建临时目录
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    await mkdir(tempDir, { recursive: true });

    // 生成唯一文件名
    const uniqueId = uuidv4();
    inputPath = path.join(tempDir, `input-${uniqueId}.mp4`);
    outputPath = path.join(tempDir, `output-${uniqueId}.${outputFormat}`);

    // 保存上传的视频文件
    await saveVideoFromStream(request, inputPath);

    // 检查文件大小
    const stats = await stat(inputPath);
    if (stats.size === 0) {
      throw new Error('输入文件大小为 0，可能上传失败');
    }

    // 验证输出格式
    const allowedFormats = ['mp4', 'avi', 'mkv', 'mov', 'flv'];
    if (!allowedFormats.includes(outputFormat.toLowerCase())) {
      throw new Error(`不支持的输出格式: ${outputFormat}`);
    }

    // 验证分辨率
    const resolutionMatch = resolution.match(/^(\d{3,4})x(\d{3,4})$/);
    if (!resolutionMatch) {
      throw new Error(`无效的分辨率格式: ${resolution}`);
    }

    // 构建 FFmpeg 命令参数
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

    // 监听 FFmpeg stderr 解析进度
    ffmpeg.stderr.on('data', (data: Buffer) => {
      const message = data.toString();
      console.log('FFmpeg stderr:', message);

      // 解析 time=HH:MM:SS.xx
      const timeMatch = message.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const seconds = parseFloat(timeMatch[3]);
        const elapsedSeconds = hours * 3600 + minutes * 60 + seconds;
        const progressPercent = duration > 0
          ? Math.min((elapsedSeconds / duration) * 100, 100)
          : 0;

        // 通过 SSE 向前端发送进度
        const progressData = {
          progress: Math.round(progressPercent),
        };
        passThrough.write(`data: ${JSON.stringify(progressData)}\n\n`);
      }
    });

    // FFmpeg 处理结束
    await new Promise<void>((resolve, reject) => {
      ffmpeg.on('close', async (code) => {
        if (code === 0) {
          console.log('FFmpeg 处理完成');
          const outputFileName = path.basename(outputPath);
          const downloadUrl = `/temp/${outputFileName}`;

          // 通过 SSE 告知前端处理完成并提供下载链接
          const completeData = {
            status: 'complete',
            downloadUrl,
            progress: 100,
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
    passThrough.end();
    if (inputPath) {
      await unlink(inputPath).catch(() => console.error('无法删除输入文件'));
    }
  }

  return response;
}
