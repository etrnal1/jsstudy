'use client'
import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { StreamLanguage } from '@codemirror/language'
import { shell } from '@codemirror/legacy-modes/mode/shell'

export default function Page() {
    const [formData, setFormData] = useState({
        title: '',
        cronExpression: '',
        command: '',
        description: '',
        status: 'inactive' as 'active' | 'inactive'
    })

    const [cronType, setCronType] = useState('custom')
    const [interval, setInterval] = useState({
        value: '5',
        unit: 'minutes'
    })
    const [specificTime, setSpecificTime] = useState({
        minute: '0',
        hour: '0',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
        weekOfMonth: '*'
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCommandChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            command: value
        }))
    }

    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setInterval(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSpecificTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setSpecificTime(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (cronType === 'interval') {
            let cronExp = ''
            switch (interval.unit) {
                case 'minutes':
                    cronExp = `*/${interval.value} * * * *`
                    break
                case 'hours':
                    cronExp = `0 */${interval.value} * * *`
                    break
                case 'days':
                    cronExp = `0 0 */${interval.value} * *`
                    break
            }
            setFormData(prev => ({
                ...prev,
                cronExpression: cronExp
            }))
        } else if (cronType === 'specific') {
            const { minute, hour, dayOfMonth, month, dayOfWeek } = specificTime
            const cronExp = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
            setFormData(prev => ({
                ...prev,
                cronExpression: cronExp
            }))
        }
    }, [cronType, interval, specificTime])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/cut', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                alert('定时任务创建成功!')
                setFormData({
                    title: '',
                    cronExpression: '',
                    command: '',
                    description: '',
                    status: 'inactive'
                })
                setCronType('custom')
                setInterval({
                    value: '5',
                    unit: 'minutes'
                })
                setSpecificTime({
                    minute: '0',
                    hour: '0',
                    dayOfMonth: '*',
                    month: '*',
                    dayOfWeek: '*',
                    weekOfMonth: '*'
                })
            }
        } catch (error) {
            console.error('创建任务失败:', error)
            alert('创建任务失败，请重试')
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Linux 定时任务管理</h1>
            
            <div className="mb-4 p-4 bg-gray-100 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Cron 表达式说明:</h2>
                <p className="text-sm text-gray-600">
                    格式: 分 时 日 月 周<br/>
                    示例:<br/>
                    */5 * * * * - 每5分钟执行一次<br/>
                    0 2 * * * - 每天凌晨2点执行<br/>
                    0 0 * * 0 - 每周日午夜执行
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium">
                        任务名称
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        执行周期设置
                    </label>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                value="interval"
                                checked={cronType === 'interval'}
                                onChange={(e) => setCronType(e.target.value)}
                                className="mr-2"
                            />
                            间隔执行
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                value="specific"
                                checked={cronType === 'specific'}
                                onChange={(e) => setCronType(e.target.value)}
                                className="mr-2"
                            />
                            具体时间
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                value="custom"
                                checked={cronType === 'custom'}
                                onChange={(e) => setCronType(e.target.value)}
                                className="mr-2"
                            />
                            自定义Cron
                        </label>
                    </div>

                    {cronType === 'interval' ? (
                        <div className="flex gap-2 items-center">
                            <span>每</span>
                            <input
                                type="number"
                                name="value"
                                value={interval.value}
                                onChange={handleIntervalChange}
                                className="w-20 px-2 py-1 border rounded-md"
                                min="1"
                            />
                            <select
                                name="unit"
                                value={interval.unit}
                                onChange={handleIntervalChange}
                                className="px-2 py-1 border rounded-md"
                            >
                                <option value="minutes">分钟</option>
                                <option value="hours">小时</option>
                                <option value="days">天</option>
                            </select>
                            <span>执行一次</span>
                        </div>
                    ) : cronType === 'specific' ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">分钟</label>
                                <input
                                    type="number"
                                    name="minute"
                                    value={specificTime.minute}
                                    onChange={handleSpecificTimeChange}
                                    className="w-full px-2 py-1 border rounded-md"
                                    min="0"
                                    max="59"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">小时</label>
                                <input
                                    type="number"
                                    name="hour"
                                    value={specificTime.hour}
                                    onChange={handleSpecificTimeChange}
                                    className="w-full px-2 py-1 border rounded-md"
                                    min="0"
                                    max="23"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">日期</label>
                                <select
                                    name="dayOfMonth"
                                    value={specificTime.dayOfMonth}
                                    onChange={handleSpecificTimeChange}
                                    className="w-full px-2 py-1 border rounded-md"
                                >
                                    <option value="*">每日</option>
                                    {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}日</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">月份</label>
                                <select
                                    name="month"
                                    value={specificTime.month}
                                    onChange={handleSpecificTimeChange}
                                    className="w-full px-2 py-1 border rounded-md"
                                >
                                    <option value="*">每月</option>
                                    {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                                        <option key={month} value={month}>{month}月</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">星期</label>
                                <select
                                    name="dayOfWeek"
                                    value={specificTime.dayOfWeek}
                                    onChange={handleSpecificTimeChange}
                                    className="w-full px-2 py-1 border rounded-md"
                                >
                                    <option value="*">每天</option>
                                    <option value="1">周一</option>
                                    <option value="2">周二</option>
                                    <option value="3">周三</option>
                                    <option value="4">周四</option>
                                    <option value="5">周五</option>
                                    <option value="6">周六</option>
                                    <option value="0">周日</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">第几周</label>
                                <select
                                    name="weekOfMonth"
                                    value={specificTime.weekOfMonth}
                                    onChange={handleSpecificTimeChange}
                                    className="w-full px-2 py-1 border rounded-md"
                                >
                                    <option value="*">每周</option>
                                    <option value="1">第一周</option>
                                    <option value="2">第二周</option>
                                    <option value="3">第三周</option>
                                    <option value="4">第四周</option>
                                    <option value="5">第五周</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <input
                            type="text"
                            id="cronExpression"
                            name="cronExpression"
                            value={formData.cronExpression}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="*/5 * * * *"
                            required
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="command" className="block text-sm font-medium">
                        执行命令
                    </label>
                    <CodeMirror
                        value={formData.command}
                        height="100px"
                        extensions={[StreamLanguage.define(shell)]}
                        onChange={handleCommandChange}
                        className="border rounded-md"
                        theme="dark"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium">
                        任务描述
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                        placeholder="请输入任务描述"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-medium">
                        任务状态
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="active">启用</option>
                        <option value="inactive">禁用</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    创建定时任务
                </button>
            </form>
        </div>
    )
}