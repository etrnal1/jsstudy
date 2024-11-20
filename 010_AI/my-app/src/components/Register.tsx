import React from 'react';
import { Navbar } from './Navbar';
import { Button } from "@/components/ui/button";

export function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">注册</h2>
          <form>
            <input
              type="text"
              placeholder="用户名"
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input
              type="email"
              placeholder="邮箱"
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input
              type="password"
              placeholder="密码"
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <Button type="submit" className="bg-blue-500 text-white w-full rounded p-2 hover:bg-blue-600">
              注册
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
