'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// 移除 lexical 相关的导入,改用简单的 textarea
interface FormData {
    title: string;
    content: string;
    video: File | null;
}

export default function TestPage() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        video: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                video: e.target.files[0],
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add logic to handle form submission, e.g., send data to an API
    };

    return (
        <main className="grid grid-cols-1 gap-4 p-4">
            <h1 className="text-2xl font-bold mb-4">发表文章</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="title">标题</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="请输入文字标题" 
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="content">内容</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        rows={6}
                        placeholder="请输入文章内容"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="video">上传视频</label>
                    <input 
                        type="file"
                        id="video"
                        name="video"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                    />
                </div>

                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">发表</button>
                </div>
            </form>
        </main>
    );
}