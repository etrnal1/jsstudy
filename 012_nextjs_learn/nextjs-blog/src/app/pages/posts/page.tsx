// 路由跳转页面
import Link from "next/link"
export default function Home(){
    return (
        <>
        <h1>First Post </h1>
        <h2>
            <Link href="/">Back Home</Link>
        </h2>
          
        </>
    )
}