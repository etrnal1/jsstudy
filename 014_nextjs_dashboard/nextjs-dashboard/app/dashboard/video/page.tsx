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
  const [endTimeStr, setEndTimeStr] = useState('00:00:00');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      addLog(`已选择文件: ${e.target.files[0].name}`);
    }
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleCutVideo = async () => {
    if (!videoFile || !startTimeStr || !endTimeStr) {
      addLog('错误: 请填写所有必要信息');
      return;
    }

    try {
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
      formData.append('startTime', startTimeStr);
      formData.append('duration', duration.toString());

      const response = await fetch('/api/video/cut', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '视频处理失败');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `cut_${videoFile.name}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);

      addLog('视频处理完成，开始下载');
    } catch (error) {
      addLog(`错误: ${error.message}`);
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-lg bg-gray-50 p-6">
        <h1 className={`${lusitana.className} mb-6 text-2xl`}>视频处理工具</h1>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">选择视频文件</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium">开始时间 (HH:MM:SS)</label>
            <input
              type="text"
              value={startTimeStr}
              onChange={(e) => setStartTimeStr(e.target.value)}
              pattern="^\d{2}:\d{2}:\d{2}$"
              placeholder="00:00:00"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">结束时间 (HH:MM:SS)</label>
            <input
              type="text"
              value={endTimeStr}
              onChange={(e) => setEndTimeStr(e.target.value)}
              pattern="^\d{2}:\d{2}:\d{2}$"
              placeholder="00:00:10"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <button
          onClick={handleCutVideo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          剪切视频
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
