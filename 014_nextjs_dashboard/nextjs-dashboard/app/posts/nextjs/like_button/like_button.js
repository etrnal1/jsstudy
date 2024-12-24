// 导出LikeButton组件
'use client'  // react 在客户端渲染组件
import {useState} from 'react'
export default function LikeButton(){
    const [likes,setLikes] = useState(0)
    function handleClick(){
        setLikes(likes+1)

    }
    return <button className="bg-red-600"onClick={handleClick}>like Like components:    {likes}</button>
}