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

      const url = `/api/video/cut?startTime=${encodeURIComponent(startTimeStr)}&duration=${duration}`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: videoFile,
        headers: {
          'Content-Type': videoFile.type,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '视频处理失败');
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = `cut_${videoFile.name}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);

      addLog('视频处理完成，开始下载');
    } catch (error: any) {
      addLog(`错误: ${error.message}`);
    }
}; 