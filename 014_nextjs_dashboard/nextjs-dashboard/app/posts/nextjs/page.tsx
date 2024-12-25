'use client'
import LikeButton from './like_button/like_button'
import { useState } from "react"

function Header({title}){
    return <div><h1>{title ? title:'志鹏请假了'}</h1></div>
}

export default  function Page(){
   
   
    const names = ['志鹏','玉龙','正正'];
   
  
    const [likes,setLikes ] = useState(0);
    const  handleClick=()=>{
    setLikes(likes+1)
    }

    return(
        <div className="justify-center items-center flex p-2 min-h-screen">
            <ul>
                {names.map((name)=>(
                    <li key={name}>{name}</li>
                ))}
            </ul>
            <button onClick = {handleClick} className="bg-teal-700 p-2 text-white rounded w-42">click</button>
            <p>like{likes}</p>
            <Header title="喜欢巩"/>
            <LikeButton />
           
        </div>
    )
}