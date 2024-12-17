'use client';

import { useState, useRef, useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';

// 时间转换工具
const timeToSeconds = (timeStr: string) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

// 秒数转换为时间字符串
const secondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function VideoPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [startTimeStr, setStartTimeStr] = useState('00:00:00');
  const [endTimeStr, setEndTimeStr] = useState('00:00:10');
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // 清理函数
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        addLog(`错误: 请选择有效的视频文件 (当前文件类型: ${file.type})`);
        return;
      }
      // 清理之前的预览URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      // 创建新的预览URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setVideoFile(file);
      setDownloadUrl(''); // 清除之前的下载链接
      setProcessedVideoUrl(''); // 清除之前的处理后视频预览
      addLog(`已选择文件: ${file.name} (大小: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    }
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  // 简化的时间输入处理
  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    setter(value);
  };

  const handleCutVideo = async () => {
    if (!videoFile || !startTimeStr || !endTimeStr) {
      addLog('错误: 请填写所有必要信息');
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setDownloadUrl('');
      setProcessedVideoUrl('');
      
      const startSeconds = timeToSeconds(startTimeStr);
      const endSeconds = timeToSeconds(endTimeStr);
      const duration = endSeconds - startSeconds;

      if (duration <= 0) {
        addLog('错误: 结束时间必须大于开始时间');
        return;
      }

      addLog(`开始处理视频... 从 ${startTimeStr} 到 ${endTimeStr} (持续 ${secondsToTime(duration)})`);
      
      const formData = new FormData();
      formData.append('video', videoFile);

      const url = `/api/video/cut?startTime=${encodeURIComponent(startTimeStr)}&duration=${duration}`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let boundary = buffer.indexOf('\n\n');

        while (boundary !== -1) {
          const message = buffer.slice(0, boundary).trim();
          buffer = buffer.slice(boundary + 2);
          console.log("接收数据信息: ",message);
          if (message.startsWith('data: ')) {
            try {
              const data = JSON.parse(message.slice(6));
              
              if (data.progress) {
                setProgress(Math.round(parseFloat(data.progress)));
                addLog(`处理进度: ${data.progress}%`);
              }
              
              if (data.error) {
                throw new Error(data.error);
              }
              console.log("打印完成状态",data.status)
              if (data.status === 'complete' && data.downloadUrl) {
                const fullDownloadUrl = data.downloadUrl.startsWith('/')
                ? `${window.location.origin}${data.downloadUrl}`
                : data.downloadUrl;

                console.log("视频完成了",fullDownloadUrl)
              setDownloadUrl(fullDownloadUrl);
              setProcessedVideoUrl(fullDownloadUrl);
              addLog('视频处理完成，可以预览和下载了');
              console.log('下载链接:', fullDownloadUrl); // 添加调试日志
              }
            } catch (e: any) {
              console.error('解析数据失败:', e);
              addLog(`错误: ${e.message}`);
            }
          }

          boundary = buffer.indexOf('\n\n');
        }
      }
    } catch (error: any) {
      addLog(`错误: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>视频剪切工具</h1>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">选择视频文件</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={isProcessing}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>

        {previewUrl && (
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">原始视频预览</label>
            <video
              ref={videoRef}
              src={previewUrl}
              controls
              className="w-full max-h-[400px] rounded-lg"
            >
              您的浏览器不支持视频标签。
            </video>
          </div>
        )}

        {processedVideoUrl && (
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">处理后的视频预览</label>
            <video
              src={processedVideoUrl}
              controls
              className="w-full max-h-[400px] rounded-lg"
            >
              您的浏览器不支持视频标签。
            </video>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">开始时间 (HH:MM:SS)</label>
            <input
              type="time"
              step="1"
              value={startTimeStr}
              onChange={(e) => handleTimeInput(e, setStartTimeStr)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">结束时间 (HH:MM:SS)</label>
            <input
              type="time"
              step="1"
              value={endTimeStr}
              onChange={(e) => handleTimeInput(e, setEndTimeStr)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        {isProcessing && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 text-center">{progress.toFixed(2)}%</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleCutVideo}
            disabled={isProcessing || !videoFile}
            className={`flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
              isProcessing || !videoFile
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-600'
            }`}
          >
            {isProcessing ? '处理中...' : '剪切视频'}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`cut_${videoFile?.name || 'video.mp4'}`}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition-colors"
            >
              下载处理后的视频
            </a>
          )}
        </div>

        <div className="mt-6">
          <h2 className={`${lusitana.className} mb-4 text-xl`}>处理日志</h2>
          <div className="bg-black text-green-400 p-4 rounded-lg h-48 overflow-y-auto font-mono text-sm">
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}