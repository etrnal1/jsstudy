'use client';  // 声明这是一个客户端组件
               // 1. 客户端组件可以使用React hooks(如useState、useEffect等)
               // 2. 可以访问浏览器API(如window、document等)
               // 3. 可以添加交互事件处理(如onClick、onChange等)
               // 4. 这个指令必须放在文件最顶部
// 通过url访问的页面,必须使用page.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import Link from 'next/link';

export default function RegisterPage() {
  // 使用 useState 钩子管理表单数据
  // formData 包含所有表单字段，setFormData 用于更新表单数据
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 处理表单输入变化的函数
  // e.target 包含触发事件的输入框的信息（name 和 value）
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,  // 保留之前的所有表单数据
      [name]: value  // 只更新发生变化的字段
    }));
  };

  // 处理表单提交的函数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // 阻止表单的默认提交行为
    // TODO: 这里可以添加表单验证逻辑
    // TODO: 这里可以添加API调用来处理注册
    console.log('注册信息:', formData);
  };

  return (
    <>
      {/* Navbar 组件用于显示导航栏 */}
      <Navbar />
      {/* main 容器，使用 Tailwind CSS 类设置样式 */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">注册账号</h1>
        {/* 注册表单，设置最大宽度和表单项间距 */}
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          {/* 用户名输入框 */}
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
          
          {/* 邮箱输入框 */}
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

          {/* 密码输入框 */}
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

          {/* 确认密码输入框 */}
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

          {/* 提交按钮，使用 shadcn/ui 的 Button 组件 */}
          <Button type="submit" size="lg" className="w-full">注册</Button>

          {/* 登录链接，使用 Next.js 的 Link 组件进行页面导航 */}
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
