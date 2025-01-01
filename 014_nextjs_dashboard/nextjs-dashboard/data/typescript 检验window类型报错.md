---
title: "typescript windows 报错"
date: "2024-12-31" 
tag: ["typescript"]
---



ReferenceError: window is not defined 错误的原因是因为在 **Next.js** 的 **Server Component** 或服务端环境中，window 对象是不可用的。



**原因**



在 Next.js 中：

- **Server Components** 和服务端代码是在 Node.js 环境中执行的，window 对象不存在。
- window 是浏览器提供的全局对象，仅在客户端环境（浏览器中）可用。



根据你的代码：

```ts
useEffect(() => {

  checkAuth();

}, [window.location.pathname]);


```





你在 useEffect 的依赖数组中使用了 window.location.pathname，但 useEffect 的代码虽然是客户端运行的，它的依赖数组在组件初始化时（包括服务端渲染阶段）会被解析。此时，window 对象未定义。



**解决方法**



你需要确保 window 的使用仅限于客户端，并在服务端避免直接引用。



**1. 改用 typeof window !== 'undefined'**



在依赖数组中避免直接访问 window，使用 typeof window !== 'undefined' 检查是否处于客户端环境：

```ts


useEffect(() => {

  if (typeof window !== 'undefined') {

   checkAuth();

  }

}, []);
```





**2. 将 window.location.pathname 提取到 useEffect 内**



不要将 window.location.pathname 放在依赖数组中，改为在 useEffect 内部使用：

```tsx
useEffect(() => {

  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  if (path) {

​    checkAuth();

  }

}, []);


```





这样可以避免在依赖数组中直接引用 window。



**3. 如果 checkAuth 依赖于路径，使用 useRouter**



如果你使用的是 Next.js，推荐使用 useRouter 来获取当前路径，而不是直接访问 window.location.pathname：

```tsx
import { useRouter } from 'next/router';



function Nav() {

  const router = useRouter();



  useEffect(() => {

​    const path = router.pathname; // 获取当前路径

​    checkAuth(path);

  }, [router.pathname]);



  // 其他代码

}
```







**推荐改法**



将你的 Nav 组件修改如下：

```tsx
import { useEffect } from 'react';

import { useRouter } from 'next/router';



function Nav() {

  const router = useRouter();



  useEffect(() => {

​    checkAuth(router.pathname); // 使用 Next.js 的路由系统

  }, [router.pathname]);



  // 如果需要挂载检查

  const mounted = true; // 假设 mounted 的逻辑在其他地方定义



  if (!mounted) {

​    return <p>Loading...</p>;

  }



  return <nav>{/* 导航内容 */}</nav>;

}



export default Nav;
```







**关键点总结**

​	1.	在服务端渲染时，window 对象不可用。

​	2.	在 Next.js 中优先使用 useRouter 提供的路由信息，而不是直接依赖 window.location。

​	3.	如果必须使用 window，需要检查 typeof window !== 'undefined' 来确保代码仅在客户端运行。