import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, stat, unlink, mkdir as fsMkdir, copyFile } from 'fs/promises';
import { spawn } from 'child_process';

export async function POST(request: Request) {
  let inputPath = '';
  let outputPath = '';
  
  try {
    const formData = await request.formData();
    const file = formData.get('video') as File;
    const startTime = formData.get('startTime') as string || '00:00:00';
    const duration = formData.get('duration') as string || '30';

    if (!file) {
      return NextResponse.json({ error: '没有收到视频文件' }, { status: 400 });
    }

    // 创建临时目录和文件
    const tempDir = path.join(process.cwd(), 'tmp');
    await fsMkdir(tempDir, { recursive: true });
    
    const timestamp = Date.now();
    inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

    // 保存上传的文件
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(arrayBuffer));

    // 执行视频剪切
    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn('ffmpeg', [
        '-ss', startTime,
        '-i', inputPath,
        '-t', duration,
        '-c:v', 'copy',
        '-c:a', 'copy',
        outputPath
      ]);

      ffmpeg.stderr.on('data', (data) => {
        console.log(`FFmpeg Log: ${data}`);
      });

      ffmpeg.on('close', async (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error('FFmpeg 处理失败'));
        }
      });

      ffmpeg.on('error', reject);
    });

    // 创建公共访问目录
    const publicDir = path.join(process.cwd(), 'public', 'videos');
    await fsMkdir(publicDir, { recursive: true });
    const publicPath = path.join(publicDir, `cut-${timestamp}.mp4`);

    // 复制到公共目录
    await copyFile(outputPath, publicPath);

    // 返回成功响应
    return NextResponse.json({
      success: true,
      url: `/videos/cut-${timestamp}.mp4`
    });

  } catch (error) {
    console.error('视频处理错误:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    // 清理临时文件
    if (inputPath) await unlink(inputPath).catch(() => {});
    if (outputPath) await unlink(outputPath).catch(() => {});
  }
}

// 配置较大的文件大小限制
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};