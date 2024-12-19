'use client'

import { useState } from "react"

interface FormData {
    title: string;
    cronExpression: string;
    description: string;
    command: string;
    status: 'active' | 'inactive';
}

export default function CutPage() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        cronExpression: '',
        description: '',
        command: '',
        status: 'inactive'
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                    description: '',
                    command: '',
                    status: 'inactive'
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
                    <label htmlFor="cronExpression" className="block text-sm font-medium">
                        Cron 表达式
                    </label>
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
                </div>

                <div className="space-y-2">
                    <label htmlFor="command" className="block text-sm font-medium">
                        执行命令
                    </label>
                    <input
                        type="text"
                        id="command"
                        name="command"
                        value={formData.command}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="node /path/to/script.js"
                        required
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
                        rows={4}
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