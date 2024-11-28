"use client"

import { useState } from "react";

interface PostsPageProps {
    title?: string;
    description?: string;
}

export default function PostsPage({ title = "Posts", description = "Submit your information" }: PostsPageProps) {
    const [clicked, setClicked] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        console.log("获取相关传递至",e)
        e.preventDefault()
        setClicked(true)
    }

    return <div className="p-6 mx-auto max-w-2xl">
        <div className="bg-white p-8 mb-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{description}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* 按照一层一层堆叠 */}
                <div className="flex flex-col mb-6">
                    <input type="text" name="username" placeholder="用户名" className="p-3 border rounded-lg focus:ring-blue-400 focus:ring-2 focus:outline-none"/>
                </div>
                <div className="flex flex-col mb-12">
                    <input type="text" name="password" placeholder="密码" className="p-3 border rounded-lg focus:ring-blue-400 focus:ring-2 focus:outline-none"/>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors duration-300">
                    提交
                </button>
            </form>
        </div>
    </div>;
}