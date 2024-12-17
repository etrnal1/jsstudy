'use client';

import { useState, useRef, useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';

// 时间转换工具
const timeToSeconds = (timeStr: string): number => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

// 秒数转换为时间字符串
const secondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function VideoPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [startTimeStr, setStartTimeStr] = useState('00:00:00');
  const [endTimeStr, setEndTimeStr] = useState('00:00:10');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 清理函数
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      // 清理 AbortController
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [previewUrl]);

  // 处理文件选择
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
      console.log(`已选择文件: ${file.name} (大小: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    }
  };

  // 添加日志
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // 处理时间输入
  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    setter(value);
    console.log(`设置时间: ${value}`);
  };

  // 处理视频剪切
  const handleCutVideo = async () => {
    console.log('handleCutVideo 被调用');

    if (!videoFile || !startTimeStr || !endTimeStr) {
      addLog('错误: 请填写所有必要信息');
      console.log('错误: 缺少必要的信息');
      return;
    }

    try {
      // 如果有正在进行的请求，先中止它
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // 创建新的 AbortController
      abortControllerRef.current = new AbortController();

      console.log('开始处理视频...');
      setIsProcessing(true);
      setDownloadUrl('');
      setProcessedVideoUrl('');

      const startSeconds = timeToSeconds(startTimeStr);
      const endSeconds = timeToSeconds(endTimeStr);
      const duration = endSeconds - startSeconds;

      if (duration <= 0) {
        addLog('错误: 结束时间必须大于开始时间');
        console.log('错误: 结束时间小于或等于开始时间');
        setIsProcessing(false);
        return;
      }

      addLog(`开始处理视频... 从 ${startTimeStr} 到 ${endTimeStr} (持续 ${secondsToTime(duration)})`);
      console.log(`视频剪切参数: startSeconds=${startSeconds}, endSeconds=${endSeconds}, duration=${duration}`);

      const formData = new FormData();
      formData.append('video', videoFile);

      const url = `/api/video/cut?startTime=${encodeURIComponent(startTimeStr)}&duration=${duration}`;
      console.log(`发送请求到: ${url}`);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal
      });
      console.log('收到响应:', response);
      console.log('收到响应，状态码:', response.status);

      if (!response.ok) {
        console.log('响应不正常，状态码:', response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.log('无法获取响应流');
        throw new Error('无法获取响应流');
      }

      console.log('开始读取响应流');
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log('响应流已结束');
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        let boundary = buffer.indexOf('\n\n');

        while (boundary !== -1) {
          const message = buffer.slice(0, boundary).trim();
          buffer = buffer.slice(boundary + 2);

          console.log('解析消息:', message);
          addLog(message)

          if (message.startsWith('data: ')) {
            try {
              const data = JSON.parse(message.slice(6));
              console.log('收到的数据:', data);

              if (data.error) {
                console.log('收到错误:', data.error);
                addLog(`错误: ${data.error}`);
                throw new Error(data.error);
              }
              // 前端需要使用 EventSource 来监听从后端发送的 SSE 消息。EventSource 是浏览器原生支持的一种 API，用于接收服务器推送的事件流。
              if (data.status === 'complete' && data.downloadUrl) {
                const fullDownloadUrl = `${window.location.origin}${data.downloadUrl}`;
                console.log('设置下载链接:', fullDownloadUrl);
                addLog('设置下载链接:')
                addLog(fullDownloadUrl)
                setDownloadUrl(fullDownloadUrl);
                setProcessedVideoUrl(fullDownloadUrl);
                addLog('视频处理完成，可以预览和下载了');
                setIsProcessing(false); // 处理完成时设置状态
              }
            } catch (e: any) {
              console.error('解析数据失败:', e);
              addLog(`错误: ${e.message}`);
              setIsProcessing(false); // 发生错误时设置状态
            }
          }

          boundary = buffer.indexOf('\n\n');
        }
      }
    } catch (error: any) {
      console.error('处理错误:', error);
      addLog(`错误: ${error.message}`);
      setIsProcessing(false); // 发生错误时设置状态
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>视频剪切工具</h1>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {/* 文件选择 */}
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

        {/* 原始视频预览 */}
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

        {/* 处理后的视频预览 */}
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

        {/* 时间设置 */}
        <div className="mt-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">开始时间</label>
              <input
                type="text"
                value={startTimeStr}
                onChange={(e) => handleTimeInput(e, setStartTimeStr)}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                disabled={isProcessing}
                placeholder="格式: 00:00:00"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">结束时间</label>
              <input
                type="text"
                value={endTimeStr}
                onChange={(e) => handleTimeInput(e, setEndTimeStr)}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                disabled={isProcessing}
                placeholder="格式: 00:00:10"
              />
            </div>
          </div>
        </div>

        {/* 处理按钮 */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleCutVideo}
            className="w-full p-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-400"
            disabled={isProcessing || !videoFile || !startTimeStr || !endTimeStr}
          >
            {isProcessing ? '处理中...' : '剪切视频'}
          </button>
        </div>

        {/* 日志 */}
        <div className="mt-4">
          <h2 className="text-sm font-medium">日志</h2>
          <div className="mt-2 p-2 bg-gray-100 rounded-md max-h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-sm text-gray-600">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* 下载链接 */}
        {downloadUrl && (
          <div className="mt-4">
            <a
              href={downloadUrl}
              download
              className="text-blue-500 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              点击下载剪切后的视频
            </a>
          </div>
        )}
      </div>
    </div>
  );
}