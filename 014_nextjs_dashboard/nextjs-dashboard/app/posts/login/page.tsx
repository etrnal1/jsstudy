'use client'
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

        <form className="space-y-6">
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
                type={showPassword ? "text" : "password"} // 动态切换输入框类型
                id="password"
                placeholder="请输入密码"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {/* 切换眼睛图标 */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"} {/* 使用不同的图标 */}
              </button>
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
          <a href="#" className="hover:underline">
            立即注册
          </a>
        </div>
      </div>
    </div>
  );
}