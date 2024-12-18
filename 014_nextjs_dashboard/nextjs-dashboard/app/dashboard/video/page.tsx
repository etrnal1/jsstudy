'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpTrayIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

export default function VideoUploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [startTimeStr, setStartTimeStr] = useState('00:00:00');
  const [endTimeStr, setEndTimeStr] = useState('00:00:00');
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [resolution, setResolution] = useState('1280x720');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [processedVideoUrl, setProcessedVideoUrl] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const timeToSeconds = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 可选：添加文件大小限制
      const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
      if (file.size > MAX_FILE_SIZE) {
        addLog('错误: 文件大小超过 100MB');
        return;
      }

      setVideoFile(file);
      addLog(`已选择文件: ${file.name}`);
    }
  };

  const isValidTimeFormat = (timeStr: string) => {
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d(\.\d+)?)$/;
    return timeRegex.test(timeStr);
  };

  const handleCutVideo = async () => {
    if (!videoFile || !startTimeStr || !endTimeStr) {
      addLog('错误: 请填写所有必要信息');
      return;
    }

    if (!isValidTimeFormat(startTimeStr) || !isValidTimeFormat(endTimeStr)) {
      addLog('错误: 时间格式必须为 HH:MM:SS');
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setDownloadUrl('');
      setProcessedVideoUrl('');
      setLogs([]);

      const startSeconds = timeToSeconds(startTimeStr);
      const endSeconds = timeToSeconds(endTimeStr);
      const duration = endSeconds - startSeconds;

      if (duration <= 0) {
        addLog('错误: 结束时间必须大于开始时间');
        setIsProcessing(false);
        return;
      }

      const formData = new FormData();
      formData.append('video', videoFile);

      abortControllerRef.current = new AbortController();
      addLog('开始上传视频文件...');

      const response = await fetch(
        `/api/video/cut?startTime=${encodeURIComponent(startTimeStr)}&duration=${duration}&outputFormat=${encodeURIComponent(outputFormat)}&resolution=${encodeURIComponent(resolution)}`,
        {
          method: 'POST',
          body: formData,
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法读取响应流');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        console.log('读取数据:', { done, value });

        if (done) {
          addLog('处理完成');
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const messages = buffer.split('\n\n');
        buffer = messages.pop() || '';

        for (const message of messages) {
          if (message.startsWith('data: ')) {
            try {
              const data = JSON.parse(message.slice(6));
              console.log('接收到的数据:', data);
              
              if (data.progress !== undefined) {
                setProgress(data.progress);
                addLog(`处理进度: ${data.progress}%`);
              }

              if (data.status === 'complete' && data.downloadUrl) {
                setDownloadUrl(data.downloadUrl);
                setProcessedVideoUrl(data.downloadUrl);
                addLog('视频处理完成！');
              }

              if (data.error) {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error('解析SSE数据失败:', e);
              addLog(`解析数据失败: ${e instanceof Error ? e.message : '未知错误'}`);
            }
          }
        }
      }

    } catch (error) {
      console.error('处理失败:', error);
      addLog(`错误: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  // 释放 Object URLs 以释放内存
  useEffect(() => {
    return () => {
      if (processedVideoUrl) {
        URL.revokeObjectURL(processedVideoUrl);
      }
    };
  }, [processedVideoUrl]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">视频剪辑工具</h1>
          
          {/* 文件上传区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择视频文件
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>上传视频</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="video/*"
                      onChange={handleFileSelect}
                      disabled={isProcessing}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">MP4, MOV 等视频格式</p>
              </div>
            </div>
            {videoFile && (
              <p className="mt-2 text-sm text-gray-500">
                已选择: {videoFile.name}
              </p>
            )}

            {/* 原始视频预览 */}
            {videoFile && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-800 mb-1">原始视频预览</h4>
                <video 
                  src={URL.createObjectURL(videoFile)} 
                  controls 
                  className="w-full rounded-md"
                  preload="metadata"
                >
                  您的浏览器不支持视频播放。
                </video>
              </div>
            )}
          </div>

          {/* 参数设置 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">参数设置</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  开始时间
                </label>
                <input
                  type="text"
                  value={startTimeStr}
                  onChange={(e) => setStartTimeStr(e.target.value)}
                  placeholder="HH:MM:SS"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  结束时间
                </label>
                <input
                  type="text"
                  value={endTimeStr}
                  onChange={(e) => setEndTimeStr(e.target.value)}
                  placeholder="HH:MM:SS"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  输出格式
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled={isProcessing}
                >
                  <option value="mp4">MP4</option>
                  <option value="avi">AVI</option>
                  <option value="mkv">MKV</option>
                  <option value="mov">MOV</option>
                  <option value="flv">FLV</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分辨率
                </label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled={isProcessing}
                >
                  <option value="1920x1080">1920x1080</option>
                  <option value="1280x720">1280x720</option>
                  <option value="854x480">854x480</option>
                  <option value="640x360">640x360</option>
                  <option value="426x240">426x240</option>
                </select>
              </div>
            </div>
          </div>

          {/* 处理按钮 */}
          <button
            onClick={handleCutVideo}
            disabled={isProcessing || !videoFile}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                处理中...
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                开始处理
              </>
            )}
          </button>

          {/* 进度条 */}
          {isProcessing && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center mt-2 text-sm text-gray-600">
                处理进度: {progress}%
              </div>
            </div>
          )}

          {/* 处理日志 */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">处理日志</h3>
            <div className="bg-gray-50 rounded-lg p-4 h-40 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-sm text-gray-600">{log}</div>
              ))}
            </div>
          </div>

          {/* 下载链接和视频预览 */}
          {downloadUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">处理结果</h3>
              <a
                href={downloadUrl}
                download
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                下载处理后的视频
              </a>

              {/* 视频预览 */}
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-800 mb-1">视频预览</h4>
                <video 
                  src={processedVideoUrl} 
                  controls 
                  className="w-full rounded-md"
                  preload="metadata"
                >
                  您的浏览器不支持视频播放。
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}