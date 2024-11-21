// 路由跳转页面
import Link from "next/link";
import Head from "next/head";
// 导入Layout 布局

export default function Home() {
  return (
   
    <>
      <Head>
        <title>First Post </title>
      </Head>
      <h2>
        <Link href="/">Back Home</Link>
      </h2>
    </>
  );
}
