import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
export default function ChartBar() {
    const chartRef = useRef<HTMLDivElement>(null);
    const [cpuData, setCpuData] = useState<number[]>([]);

    useEffect(() => {
        if (chartRef.current) {
            const fetchData = async () => {
                const response = await fetch('/posts/api/cpu');
                const data = await response.json();
                setCpuData(data.usage);
            };

            // 初始化获取数据
            fetchData();

            const chartInstance = echarts.init(chartRef.current);
            const option = {
                title: { text: 'cpu 使用率实时监控' },
                tooltip: { trigger: 'axis' },
                xAxis: { data: Array.from({ length: cpuData.length }, (_, i) => `CPU${i + 1}`) },
                yAxis: {},
                series: [{ type: 'bar', data: cpuData }],
            };
            chartInstance.setOption(option);

            return () => {
                chartInstance.dispose();
            };
        }
    }, [cpuData]);

    return <div ref={chartRef} className="w-full h-full" style={{ width: '100%', height: '400px' }} ></div>;
}