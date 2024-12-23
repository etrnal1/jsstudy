'use client'
import { useState } from "react"

export default function Page(){
    const [name,setName] = useState('')
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

        setName(e.target.value)
        //console.log("数据发生变化了",new Date(),name)
    }
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("数据提交了",new Date(),name)
    }
    return (
        // 居中设置
        <div
         className="flex items-center justify-center min-h-screen p-8">
            <h1 className="text-2xl font-bold">智能系统</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">

                    <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">姓名</label>

                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name"
                    onChange={handleChange}
                    placeholder="请输入姓名"/>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">提交</button>
            </form>

         </div>

    )
}