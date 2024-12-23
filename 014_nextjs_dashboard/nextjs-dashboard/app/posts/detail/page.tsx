"use client";
//使用 useState管理用户状态
import { useState } from "react";

/**
 * 知识点，使用useState管理用户状态
 * 使用onChange 来存储表单数据
 * formAction 用来存储客户的提交状态
 * @returns 
 */
export default function Page() {
  const [name, setName] = useState("");
  const [ziliao, setZiliao] = useState("");
  const handleSub = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(name=='' || ziliao==''){
      if(name){
        alert("请输入密码") 
      }else{
        alert("请输用户名") 
      }
  
     
    }else{
      // console.log("检测到")
      console.log("用户名账户密码: ",name,ziliao)
    }
    
    
  };
  return (
    <div className="flex item-center mt-20 justify-center p-2 y-2 min-h-screen">
      {/* 提交  */}
      <form onSubmit={handleSub}>
        <div className="mb-4">
          <label className="blokc text-2xl text-gray-400 font-bold">
            表单提交
          </label>
          <input
            type="text"
            className="shadow p-2 focus:text-red;"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="blokc text-2xl text-gray-400 font-bold">
            表单提交
          </label>
          <input
            type="text"
            className="shadow p-2 focus:text-red;"
            value={ziliao}
            onChange={(e) => setZiliao(e.target.value)}
          />
        </div>

        {/* 圆。蓝底。白子 */}
        <div className="flex justify-center items-center mt-2">
          <button
            type="submit"
            className="rounded text-white-200 bg-blue-400 p-4 w-full"
          >
            提交
          </button>
        </div>
      </form>
    </div>
  );
}
