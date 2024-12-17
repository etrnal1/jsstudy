
'use client';

import { useState } from 'react';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        addLog(`错误: 请选择有效的视频文件 (当前文件类型: ${file.type})`);
        return;
      }
      setVideoFile(file);
      addLog(`已选择文件: ${file.name} (大小: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    }
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  // 简化的时间输入处理
  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    let value = e.target.value;

    // 如果输入的时间为 HH:MM 格式，补充秒数为 00
    const timeParts = value.split(':');
    if (timeParts.length === 2) {
      value = `${value}:00`; // 补充秒数为 00
    }
    
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
      
      const startSeconds = timeToSeconds(startTimeStr);
      const endSeconds = timeToSeconds(endTimeStr);
      const duration = endSeconds - startSeconds;

      if (duration <= 0) {
        addLog('错误: 结束时间必须大于开始时间');
        return;
      }

      addLog(`开始处理视频... 从 ${startTimeStr} 到 ${endTimeStr} (持续 ${secondsToTime(duration)})`);
      
      // 使用 FormData
      const formData = new FormData();
      formData.append('video', videoFile);

      const url = `/api/video/cut?startTime=${encodeURIComponent(startTimeStr)}&duration=${duration}`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData, // 使用 FormData 而不是直接发送文件
        // 不要手动设置 Content-Type，让浏览器自动处理
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

              if (data.status === 'complete' && data.downloadUrl) {
                addLog('视频处理完成，准备下载');
                // 创建一个隐藏的 a 标签来触发下载
                const a = document.createElement('a');
                a.href = data.downloadUrl;
                a.download = `cut_${videoFile.name}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
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
      setProgress(0);
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">开始时间 (HH:MM:SS)</label>
            <input
              type="text" // 更改为文本框输入
              value={startTimeStr}
              onChange={(e) => handleTimeInput(e, setStartTimeStr)}
              placeholder="00:00:00"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">结束时间 (HH:MM:SS)</label>
            <input
              type="text" // 更改为文本框输入
              value={endTimeStr}
              onChange={(e) => handleTimeInput(e, setEndTimeStr)}
              placeholder="00:00:10"
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

        <button
          onClick={handleCutVideo}
          disabled={isProcessing}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
            isProcessing 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-600'
          }`}
        >
          {isProcessing ? '处理中...' : '剪切视频'}
        </button>

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