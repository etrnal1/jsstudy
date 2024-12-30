'use client'
import { useState } from 'react'

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            alert('请填写所有字段')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            alert('两次输入的密码不一致')
            return
        }

        // TODO: 这里添加注册逻辑
        console.log('注册数据:', formData)
        await fetch('/posts/api/register',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(formData)


        })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">用户注册</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">邮箱</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="请输入邮箱地址"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">密码</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="请输入密码"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">确认密码</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="请再次输入密码"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    完成注册
                </button>
            </form>
        </div>
    )
}