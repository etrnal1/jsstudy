'use client';

import { useState, useRef, useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';

// ... 时间转换工具函数保持不变 ...

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

  // ... 其他函数保持不变 ...

  const handleCutVideo = async () => {
    if (!videoFile || !startTimeStr || !endTimeStr) {
      addLog('错误: 请填写所有必要信息');
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setDownloadUrl(''); // 重置下载链接
      setProcessedVideoUrl(''); // 重置预览URL
      
      // ... 其余代码保持不变 ...
    } catch (error) {
      addLog('错误: 视频处理失败');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      {/* ... 现有的代码 ... */}

      {/* 添加处理后的视频预览 */}
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

      {/* ... 现有的日志显示部分 ... */}
    </div>
  );
}
