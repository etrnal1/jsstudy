'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 在这里处理注册逻辑
    console.log('注册信息:', formData);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">注册账号</h1>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium">邮箱</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full">注册</Button>

          <p className="text-center text-sm text-gray-600">
            已有账号？
            <Link href="/blog/login" className="text-blue-600 hover:underline ml-1">
              立即登录
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
