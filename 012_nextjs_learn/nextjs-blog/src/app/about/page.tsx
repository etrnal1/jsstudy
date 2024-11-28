"use client";
import { useState } from "react";

export default function AboutPage() {
    // 逻辑部分
    const [clicked, setClicked] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">About</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="用户名"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="密码"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors duration-300"
                    >
                        提交
                    </button>
                </form>
            </div>

            <div className="text-center">
                <button 
                    className={`${clicked ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} 
                        text-white px-6 py-3 rounded-lg transition-colors duration-300`}
                    onClick={() => setClicked(!clicked)}
                >
                    {clicked ? '已点击' : '点击测试'}
                </button>
            </div>
        </div>
    );
}