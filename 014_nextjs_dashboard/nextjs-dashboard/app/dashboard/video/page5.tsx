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

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setVideoFile(file);
      setDownloadUrl('');
      setProcessedVideoUrl('');
      addLog(`选择文件: ${file.name} (大小: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    }
  };

  // 添加日志
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  // 处理时间输入
  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    setter(value);
    console.log(`设置时间: ${value}`);
  };

  // 处理视频剪切
  const handleCutVideo = async () => {
    if (!videoFile || !startTimeStr || !endTimeStr) {
      addLog('错误: 请填写所有必要信息');
      return;
    }

    try {
      setIsProcessing(true);
      setDownloadUrl('');
      setProcessedVideoUrl('');

      const startSeconds = timeToSeconds(startTimeStr);
      const endSeconds = timeToSeconds(endTimeStr);
      const duration = endSeconds - startSeconds;

      if (duration <= 0) {
        addLog('错误: 结束时间必须大于开始时间');
        setIsProcessing(false);
        return;
      }

      // 模拟处理过程
      addLog('开始处理视频...');
      
      // 模拟进度更新
      for(let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        addLog(`处理中... (${i}%)`);
      }

      // 模拟处理完成
      const mockUrl = previewUrl; // 使用原视频URL作为处理后的URL
      setDownloadUrl(mockUrl);
      setProcessedVideoUrl(mockUrl);
      addLog('视频处理完成！');

    } catch (error) {
      console.error('处理失败:', error);
      addLog(`错误: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsProcessing(false);
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
              <label className="block text-sm font-medium">开始时间</label>
              <input
                type="time"
                value={startTimeStr}
                onChange={(e) => handleTimeInput(e, setStartTimeStr)}
                disabled={isProcessing}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">结束时间</label>
              <input
                type="time"
                value={endTimeStr}
                onChange={(e) => handleTimeInput(e, setEndTimeStr)}
                disabled={isProcessing}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleCutVideo}
            disabled={isProcessing || !videoFile}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            {isProcessing ? '处理中...' : '剪切视频'}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              下载视频
            </a>
          )}
        </div>
      </div>

      {/* 日志 */}
      <div className="mt-6">
        <h2 className="text-xl">日志</h2>
        <pre className="bg-gray-100 p-4 rounded-lg mt-2 max-h-64 overflow-y-auto">
          {logs.join('\n')}
        </pre>
      </div>
    </div>
  );
}