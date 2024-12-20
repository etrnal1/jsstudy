'use client'
//列表功能
import { useState, useEffect } from 'react'

export default function PAGE() {
    // 通过useState 来管理用户数据
    const [tasks, setTasks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [editingTask, setEditingTask] = useState<any>(null)
    // 自动获取所有任务数据
    const fetchTasks = async () => {
        try {
            // 通过请求cut 获取任务数据
            const response = await fetch('/api/cut')
            const data = await response.json()
            console.log("获取任务数据",data);
            if (data.code === 200) {
                setTasks(data.tasks)
            }
        } catch (error) {
            console.error('获取任务失败:', error)
        } finally {
            setLoading(false)
        }
    }
    // 删除任务数据

    const deleteTask = async (taskId: string) => {
        try {
          
            const response = await fetch(`/api/cut/${taskId}/start`, {
                method: 'DELETE'
            })
            if (response.ok) {
                fetchTasks()
            }
        } catch (error) {
            console.error('删除任务失败:', error)
        }
    }
    // headers: {
    //    'Content-Type': 'application/json',
    //},
   
   // body: JSON.stringify(formData),
    const startTask = async (taskId: string) => {
        try {
            console.log("获取启动任务Id: ",taskId)
            const response = await fetch(`/api/cut/${taskId}/start`, {
                
                method: 'POST',
                headers:{
                    'Content-Type': 'application/text',
                },
                body:JSON.stringify(taskId)
            })
            if (response.ok) {
                fetchTasks()
            }
        } catch (error) {
            console.error('启动任务失败:', error)
        }
    }

    const handleEdit = (task: any) => {
        setEditingTask(task)
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/cut/${editingTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingTask),
            })
            if (response.ok) {
                setEditingTask(null)
                fetchTasks()
            }
        } catch (error) {
            console.error('更新任务失败:', error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const filteredTasks = tasks.filter((task: any) =>
        task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <div className="w-full px-2 sm:px-4 md:max-w-6xl md:mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                    <h1 className="text-xl sm:text-2xl font-bold">任务列表</h1>
                    <div className="w-full sm:w-1/2 md:w-1/3">
                        <input
                            type="text"
                            placeholder="搜索任务..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center">加载中...</div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务名称</th>
                                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cron表达式</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">执行命令</th>
                                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTasks.map((task: any) => (
                                    <tr key={task.id} className="hover:bg-gray-50">
                                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-sm">{task.title}</td>
                                        <td className="hidden sm:table-cell px-6 py-4 text-sm">{task.description}</td>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-sm">{task.cronExpression}</td>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-sm">{task.command}</td>
                                        <td className="hidden sm:table-cell px-6 py-4 text-sm whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${task.status === 'pending' ? 'bg-blue-100 text-blue-800' : 
                                                  task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                  'bg-gray-100 text-gray-800'}`}>
                                                {task.status === 'pending' ? '待处理' : 
                                                 task.status === 'completed' ? '已完成' : '已取消'}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-sm whitespace-nowrap">
                                            <button 
                                                onClick={() => deleteTask(task.id)}
                                                className="text-red-600 hover:text-red-900 mr-2 sm:mr-4 text-sm"
                                            >
                                                删除
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(task)}
                                                className="text-indigo-600 hover:text-indigo-900 text-sm mr-2 sm:mr-4"
                                            >
                                                编辑
                                            </button>
                                            <button
                                                onClick={() => startTask(task.id)}
                                                className="text-green-600 hover:text-green-900 text-sm"
                                            >
                                                启动
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {editingTask && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                            <h2 className="text-xl font-bold mb-4">编辑任务</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">任务名称</label>
                                    <input
                                        type="text"
                                        value={editingTask.title}
                                        onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">描述</label>
                                    <input
                                        type="text"
                                        value={editingTask.description}
                                        onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cron表达式</label>
                                    <input
                                        type="text"
                                        value={editingTask.cronExpression}
                                        onChange={(e) => setEditingTask({...editingTask, cronExpression: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">执行命令</label>
                                    <input
                                        type="text"
                                        value={editingTask.command}
                                        onChange={(e) => setEditingTask({...editingTask, command: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setEditingTask(null)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        取消
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                    >
                                        保存
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
