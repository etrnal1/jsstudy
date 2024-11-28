 
  // 从react框架中导入useState
// 复制index.html 去掉body 部分，保存js 

//这是因为 Next.js 使用了 React Server Components，这是一项允许 React 在服务器上渲染的新功能。服务器组件不支持 useState，因此您需要改用 Client 组件。
     
import LikeButton from "./likebutton"
      function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }
 
      export default function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]
 
      
        function handleClick() {
          setLikes(likes + 1)
        }
 
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
// 创建App文件夹,将其挪到App文件夹中

// 将index.js 改为page.js

// 将模块导出 export default function 
