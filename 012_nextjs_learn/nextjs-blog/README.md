This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
##  创建next js 

    npx create-next-app nextjs-blog --use-npm

### 执行过程
    ✔ Would you like to use TypeScript? … No / Yes #选择配置
    ✔ Would you like to use ESLint? … No / Yes #
    ✔ Would you like to use Tailwind CSS? … No / Yes
    ✔ Would you like your code inside a `src/` directory? … No / Yes #是否将代码放在src目录内
    ✔ Would you like to use App Router? (recommended) … No / Yes #是否使用app_router
    ✔ Would you like to use Turbopack for next dev? … No / Yes #是否在开发环境使用
    ✔ Would you like to customize the import alias (@/* by default)? … No / Yes #是否自定义导入别名
    Creating a new Next.js app in /Users/mac/Documents/Js/jsstudy/012_nextjs_learn/nextjs-blog.  #项目创建位置

    Using npm. #使用npm 来管理包

    Initializing project with template: app-tw #使用app-tw 


    Installing dependencies:
    - react
    - react-dom
    - next

    Installing devDependencies:
    - typescript
    - @types/node
    - @types/react
    - @types/react-dom
    - postcss
    - tailwindcss
    - eslint
    - eslint-config-next

    npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
    npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
    npm WARN deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
    npm WARN deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
    npm WARN deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
    npm WARN deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.

    added 373 packages in 19s

    138 packages are looking for funding
    run `npm fund` for details
    Success! Created nextjs-blog at /Users/mac/Documents/Js/jsstudy/012_nextjs_learn/nextjs-blog
### npx 和npm的区别


## 使用tsx 
 nextjs 自带内置的tyepescript,当使用create-next-app  ,配置文件在tsconfig.json  

```
    import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  /* config options here */
}
 
export default nextConfig

```javascript
 ## 在next.config.ts 配置
   Common js 

## 服务端渲染(ssr)
    假设从页面需要经常呈现从api 获取的数据。可以编写getServerSideProps  which 获取数据,并传递给page 如下所示

```
export default function Page({ data }) {
  // Render data...
}
 
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}

```js

## 代码解释

    ```
        import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The king, seeing how much happier his subjects were, realized the error of
            his ways and repealed the joke tax.
          </p>
        </section>

        {/* Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Column 1</h3>
            <p className="text-gray-600">Content for column 1</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Column 2</h3>
            <p className="text-gray-600">Content for column 2</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Column 3</h3>
            <p className="text-gray-600">Content for column 3</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="mb-16">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6 border-b pb-2">
            天国的人民
          </h2>
          <blockquote className="my-6 border-l-2 pl-6 italic text-gray-700 bg-gray-50 p-4 rounded-r-lg">
            "After all," he said, "everyone enjoys a good joke, so it's only fair that
            they should pay for the privilege."
          </blockquote>
        </section>

        {/* Action Section */}
        <section className="flex items-center gap-4">
          <Link 
            href="/pages/posts"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            查看文章
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            Click me
          </Button>
        </section>
      </div>
    </main>
  );
}

```

## 使用了css
```
        container     /* 响应式容器 */
        mx-auto       /* margin-left: auto; margin-right: auto; */
        px-4         /* padding-left: 1rem; padding-right: 1rem; */
        py-12        /* padding-top: 3rem; padding-bottom: 3rem; */
        mb-16        /* margin-bottom: 4rem */
    ```
    ```
        flex          /* display: flex */
grid          /* display: grid */
grid-cols-1   /* grid-template-columns: repeat(1, minmax(0, 1fr)) */
md:grid-cols-3 /* 在中等屏幕上使用三列布局 */
gap-6         /* gap: 1.5rem */
items-center  /* align-items: center */
```

```
        flex          /* display: flex */
grid          /* display: grid */
grid-cols-1   /* grid-template-columns: repeat(1, minmax(0, 1fr)) */
md:grid-cols-3 /* 在中等屏幕上使用三列布局 */
gap-6         /* gap: 1.5rem */
items-center  /* align-items: center */
```

### 现代css特性

```
        bg-gradient-to-b from-gray-50 to-white  
    /* background: linear-gradient(to bottom, rgb(249 250 251), rgb(255 255 255)) */

    bg-gradient-to-r from-blue-500 to-teal-400
    /* background: linear-gradient(to right, rgb(59 130 246), rgb(45 212 191)) */
```


## Getting Started

First, run the development server:

### 卡片样式

```
 bg-white rounded-lg shadow-sm hover:shadow-md
/* 
background-color: white
border-radius: 0.5rem
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)
hover:box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)
*/
```css

### 文字样式
```css

    text-4xl        /* font-size: 2.25rem */
font-extrabold  /* font-weight: 800 */
tracking-tight  /* letter-spacing: -0.025em */
text-gray-600   /* color: rgb(75 85 99) */
```
### 交互模式
```
    hover:shadow-md      /* 悬停时增加阴影 */
hover:bg-blue-100    /* 悬停时改变背景色 */
```

### 按钮样式
```
    inline-flex items-center justify-center 
/* 
display: inline-flex
align-items: center
justify-content: center 
*/
```

### 使用工具类
```
    gap-4    /* gap: 1rem */
p-4      /* padding: 1rem */
my-6     /* margin-top: 1.5rem; margin-bottom: 1.5rem */
```
### 尺寸工具类
```
    min-h-screen  /* min-height: 100vh */
max-w-2xl     /* max-width: 42rem */
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## 目录src 
    src /目录下的代码/
## next js 路由
  遵循文件夹命名，文件夹下面的都叫做page.tsx
## 创建一个组件
```
    export default function Home(){
        return (<div>Hello world</div>)
```


## Link 组件使用
先引入,在使用
文件命名tsx 
引用就需要使用,不然会报错
```
    import Link from 'next/link';
    export default function Home(){
        return (
            <div>

                Hello world
                <Link href="/">返回首页</Link>
            </div)
    }

```

##  路由 `page` 创建路由作为文件,使用link组件,不需要routing库

## api  /next/link 了解关于Link 组价的更多细腻

## 资源,元数据,css
    1.如何将静态文件等添加到Next.js 
    如何自定义 `<head>` for each page 

    2. 
