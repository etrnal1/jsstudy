'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
    const { login, checkAuth } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({
        userName: '',
        passWord: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/posts/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                await login(data.username, data.token)
                checkAuth() // 立即检查认证状态
                await new Promise(resolve => setTimeout(resolve, 100)) // 小延迟确保状态更新
                router.push('/posts')
            } else {
                setError(data.message || '登录失败')
            }
        } catch (err) {
            setError('登录过程中发生错误')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            {/* Logo 部分 */}
            <div className="mb-8 text-center">
                <img
                    src="/logo.png" // 替换为实际 logo 路径
                    alt="Logo"
                    className="h-12 mx-auto"
                />
                <h1 className="text-3xl font-bold text-blue-500 mt-2">deepseek</h1>
            </div>

            {/* 登录表单部分 */}
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                {/* 登录方式切换 */}
                <div className="flex justify-center space-x-8 mb-6">
                    <button className="text-gray-500 font-medium hover:text-blue-500">
                        验证码登录
                    </button>

                    <button className="text-blue-500 font-medium border-b-2 border-blue-500">
                        密码登录
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* 用户名输入 */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            手机号/邮箱地址
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                id="username"
                                placeholder="请输入用户名"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                value={formData.userName}
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center">
                                📧
                            </span>
                        </div>
                    </div>

                    {/* 密码输入 */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            密码
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="password"
                                id="password"
                                placeholder="请输入密码"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={(e) => setFormData({ ...formData, passWord: e.target.value })}
                                value={formData.passWord}
                            />
                        </div>
                    </div>

                    {/* 协议复选框 */}
                    <div className="flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            id="agreement"
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="agreement" className="ml-2">
                            我已阅读并同意{" "}
                            <a href="#" className="text-blue-500 hover:underline">
                                用户协议
                            </a>{" "}
                            与{" "}
                            <a href="#" className="text-blue-500 hover:underline">
                                隐私政策
                            </a>
                        </label>
                    </div>

                    {/* 登录按钮 */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                        登录
                    </button>
                </form>

                {/* 底部链接 */}
                <div className="flex justify-between mt-6 text-sm text-blue-500">
                    <a href="#" className="hover:underline">
                        忘记密码
                    </a>

                    <Link href="/posts/register" className="hover:underline">
                        立即注册
                    </Link>
                </div>
            </div>
        </div>
    );
}