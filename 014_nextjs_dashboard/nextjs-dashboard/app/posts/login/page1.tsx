export default function LoginPage() {
    return (
      <div className="flex h-screen">
        {/* 左侧背景部分 */}
        <div className="flex-1 bg-orange-200 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-orange-700">欢迎使用我们的平台</h1>
        </div>
  
        {/* 右侧登录部分 */}
        <div className="flex-1 flex justify-center items-center bg-orange-100">
          <div className="p-6 bg-white shadow-md rounded-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-6">登录</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  手机号/邮箱地址
                </label>
                <input
                  type="text"
                  placeholder="请输入用户名"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  密码
                </label>
                <input
                  type="password"
                  placeholder="请输入密码"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <button className="bg-purple-500 rounded text-white w-full py-2 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition">
                登录
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }