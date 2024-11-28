'use client'
 
// 将useState 分拆到likebuttons 里面
import LikeButton from "./likebutton"
 
//  import {useState} from 'react'  // 从react框架中导入useState
// 复制index.html 去掉body 部分，保存js
function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }
 
export default function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]
        return (
          <div>
            <Header title="Develop. Preview. Ship." />
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
 
           <LikeButton />
          </div>
        )
      }
// 创建App文件夹,将其挪到App文件夹中 [App 大文件夹命名为app小文件夹]

// 将index.js 改为page.js

// 将模块导出 export default function 

