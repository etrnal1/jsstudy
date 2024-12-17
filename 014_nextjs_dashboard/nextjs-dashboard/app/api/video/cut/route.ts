// app/api/video/cut/route.ts

import { NextResponse } from 'next/server';
import { writeFile, mkdir, stat, unlink } from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { Readable } from 'stream';
import { Buffer } from 'buffer';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export async function POST(request: Request) {
  console.log('Received request headers:', Object.fromEntries(request.headers));
  
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  const writeToStream = async (data: any) => {
    const sseData = `data: ${JSON.stringify(data)}\n\n`;
    await writer.write(new TextEncoder().encode(sseData));
  };

  try {
    const url = new URL(request.url);
    const startTime = url.searchParams.get('startTime') || '00:00:00';
    const durationParam = url.searchParams.get('duration');
    const duration = durationParam ? parseInt(durationParam, 10) : 0;

    if (duration <= 0) {
      throw new Error('Duration must be greater than 0');
    }

    // Create temp directory
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    await mkdir(tempDir, { recursive: true });

    // Generate file paths
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `input-${timestamp}.mp4`);
    const outputPath = path.join(tempDir, `output-${timestamp}.mp4`);

    // Read request body as stream
    const chunks: Buffer[] = [];
    const reader = request.body?.getReader();
    if (!reader) {
      throw new Error('No request body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value));
    }

    const bodyBuffer = Buffer.concat(chunks);
    
    // Parse multipart form data manually
    const contentType = request.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    const boundary = contentType.split('boundary=')[1];
    if (!boundary) {
      throw new Error('No boundary found in content-type');
    }
    console.log('Boundary:', boundary);

    // Find video file content in multipart data
    const boundaryBuffer = Buffer.from(`\r\n--${boundary}`);
    const headerEnd = Buffer.from('\r\n\r\n');
    
    // Find the start of the file content
    let start = bodyBuffer.indexOf(headerEnd);
    if (start === -1) {
      console.log('Could not find header end marker');
      throw new Error('Invalid multipart form data format: no header end found');
    }
    start += headerEnd.length;

    // Find the end of the file content
    let end = bodyBuffer.indexOf(boundaryBuffer, start);
    if (end === -1) {
      // Try alternative boundary format
      const altBoundaryBuffer = Buffer.from(`--${boundary}--`);
      end = bodyBuffer.indexOf(altBoundaryBuffer, start);
      if (end === -1) {
        console.log('Could not find boundary marker');
        throw new Error('Invalid multipart form data format: no boundary found');
      }
    }

    console.log('Found content bounds:', { start, end, totalLength: bodyBuffer.length });

    const fileContent = bodyBuffer.slice(start, end);
    if (fileContent.length === 0) {
      throw new Error('No file content found');
    }
    console.log('File content length:', fileContent.length);

    await writeFile(inputPath, fileContent);

    console.log('Video file saved:', inputPath);
    const stats = await stat(inputPath);
    console.log('Input file size:', stats.size);

    if (stats.size === 0) {
      throw new Error('Input file size is 0');
    }

    // Build FFmpeg command arguments
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

    console.log('FFmpeg command:', 'ffmpeg', ffmpegArgs.join(' '));

    // Start FFmpeg process
    const ffmpeg = spawn('ffmpeg', ffmpegArgs);

    // Total duration for progress calculation
    const totalSeconds = duration;

    // Helper function: Convert time string to seconds
    const timeToSeconds = (timeStr: string): number => {
      const [hours, minutes, seconds] = timeStr.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    // Listen to FFmpeg's stderr output, parse progress
    ffmpeg.stderr.on('data', (data) => {
      const message = data.toString();
      console.log('FFmpeg stderr:', message);

      // Use regular expression to extract current processing time
      const timeMatch = message.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d+)/);
      if (timeMatch) {
        const currentTimeStr = `${timeMatch[1]}:${timeMatch[2]}:${timeMatch[3]}`;
        const currentSeconds = timeToSeconds(currentTimeStr);
        const progress = Math.min(100, Math.round((currentSeconds / totalSeconds) * 100));

        // Send progress update
        writeToStream({ progress });
      } else if (message.includes('kb/s')) {
        // Send 100% progress when encoding is complete
        writeToStream({ progress: 100 });
      }
    });

    // Wait for FFmpeg process to complete
    await new Promise<void>((resolve, reject) => {
      ffmpeg.on('close', async (code) => {
        if (code === 0) {
          console.log('FFmpeg processing completed');
          const outputFileName = path.basename(outputPath);
          const downloadUrl = `/temp/${outputFileName}`;
          console.log('Generated download link:', downloadUrl);

          // Send completion message
          await writeToStream({
            status: 'complete',
            downloadUrl,
            progress: 100
          });

          // Clean up input file
          try {
            await unlink(inputPath);
            console.log('Input file deleted:', inputPath);
          } catch (err) {
            console.error('Failed to delete input file:', err);
          }

          resolve();
        } else {
          console.error('FFmpeg process exited, code:', code);
          await writeToStream({
            error: `FFmpeg process exited, code: ${code}`,
            progress: 0
          });

          // Clean up input file
          try {
            await unlink(inputPath);
            console.log('Input file deleted:', inputPath);
          } catch (err) {
            console.error('Failed to delete input file:', err);
          }

          reject(new Error(`FFmpeg process exited, code: ${code}`));
        }
      });

      ffmpeg.on('error', async (err) => {
        console.error('FFmpeg error:', err);
        await writeToStream({
          error: 'FFmpeg process startup failed',
          progress: 0
        });

        // Clean up input file
        try {
          await unlink(inputPath);
          console.log('Input file deleted:', inputPath);
        } catch (err) {
          console.error('Failed to delete input file:', err);
        }

        reject(err);
      });
    });

    // Close writer
    await writer.close();

    // Return SSE response
    return new NextResponse(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Processing error:', error);

    // Send error message
    try {
      await writeToStream({
        error: error.message,
        progress: 0
      });
    } catch (err) {
      console.error('Failed to write error information:', err);
    }

    // Close writer
    await writer.close();

    // Return SSE response
    return new NextResponse(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
}
