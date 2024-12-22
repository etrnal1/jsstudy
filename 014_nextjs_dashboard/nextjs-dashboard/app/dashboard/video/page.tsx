'use client';

import { useState, useRef } from 'react';

export default function VideoPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState("00:00:10");
  const [duration, setDuration] = useState(10);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setError('');
    }
  };

  // 修改计算时间差的函数
  const calculateDuration = (start: string, end: string): number => {
    // 验证输入格式
    const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
    if (!timeRegex.test(start) || !timeRegex.test(end)) {
      console.error('时间格式无效:', { start, end });
      return 0;
    }

    // 转换时间为秒数
    const getSeconds = (timeStr: string): number => {
      const [hours, minutes, seconds] = timeStr.split(':').map(Number);
      return (hours * 3600) + (minutes * 60) + seconds;
    };

    const startSeconds = getSeconds(start);
    const endSeconds = getSeconds(end);

    // 计算时间差
    const durationSeconds = endSeconds - startSeconds;
    
    // 确保时间差为正数
    if (durationSeconds <= 0) {
      console.error('结束时间必须大于开始时间:', { start, end, durationSeconds });
      return 0;
    }

    console.log('计算时间差:', {
      start,
      end,
      startSeconds,
      endSeconds,
      durationSeconds
    });

    return durationSeconds;
  };

  const handleCutVideo = async () => {
    if (!videoFile) {
      setError('请先选择视频文件');
      return;
    }

    // 验证时间格式
    if (!/^\d{2}:\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}:\d{2}$/.test(endTime)) {
      setError('时间格式无效，请使用 HH:MM:SS 格式');
      return;
    }

    // 计算持续时间
    const calculatedDuration = calculateDuration(startTime, endTime);
    if (calculatedDuration === 0) {
      setError('无效的时间范围，请确保结束时间大于开始时间');
      return;
    }

    // 更新持续时间状态
    setDuration(calculatedDuration);

    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const url = `/api/video/cut?startTime=${encodeURIComponent(startTime)}&duration=${calculatedDuration}`;
      
      abortControllerRef.current = new AbortController();
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error('视频处理请求失败');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法读取响应流');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.error) {
              setError(data.error);
            } else if (data.progress) {
              setProgress(data.progress);
            }
            if (data.downloadUrl) {
              setDownloadUrl(data.downloadUrl);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">视频剪辑</h1>
      
      <div className="space-y-4">
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="border p-2"
          />
        </div>

        <div>
          <label className="block">开始时间 (HH:MM:SS)</label>
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2"
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
            placeholder="00:00:00"
          />
        </div>
        {/* 结束时间 */}
        <div>
            <label className='block'>结束时间(HH:MM:SS)</label> 
            <input  
              className="border p-2" 
              type="text" 
              value={endTime} 
              onChange={(e)=>setEndTime(e.target.value)}
              pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
              placeholder="00:00:10"
            />
        </div>
        {/* end */}
        <div>
          <label className="block">持续时间 (秒)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="border p-2"
            readOnly
          />
        </div>

        <button
          onClick={handleCutVideo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          开始处理
        </button>

        {progress > 0 && progress < 100 && (
          <div>处理进度: {progress}%</div>
        )}

        {error && (
          <div className="text-red-500">{error}</div>
        )}

        {downloadUrl && (
          <div>
            <a
              href={downloadUrl}
              download
              className="text-blue-500 underline"
            >
              下载处理后的视频
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
