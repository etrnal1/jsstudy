010_AI/my-app/src/app/login.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理登录逻辑
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">邮箱</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <Button type="submit" size="lg">登录</Button>
        </form>
      </main>
    </>
  );
}