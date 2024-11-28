// 定义Button 组件

'use client'  //告速react 在客户端渲染组件
import {useState} from 'react'
export default function LikeButton(){
    const [likes,setLikes] = useState(0);
    function handleClick(){
        setLikes(likes+1);
    }
    return <button onClick={handleClick}>Like {likes}</button>
}