'use client'

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function ChartLine() {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/posts/api/cpu');
            const data = await response.json();

            if (chartInstanceRef.current) {
                chartInstanceRef.current.setOption({
                    xAxis: { data: Array.from({ length: data.usage.length }, (_, i) => `CPU${i + 1}`) },
                    series: [{ type: 'line', data: data.usage }],
                });
            }
        };

        if (chartRef.current) {
            chartInstanceRef.current = echarts.init(chartRef.current);
            chartInstanceRef.current.setOption({
                title: { text: 'CPU 使用率实时监控' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: [] },
                yAxis: { type: 'value' },
                series: [{ type: 'line', data: [] }],
            });

            // 初始化获取数据
            fetchData();

            // 定时器定时更新数据
            const intervalId = setInterval(fetchData, 50000);

            return () => {
                clearInterval(intervalId);
                chartInstanceRef.current?.dispose();
            };
        }
    }, []);

    return <div ref={chartRef} className="w-full h-full" style={{ width: '100%', height: '400px' }}></div>;
}