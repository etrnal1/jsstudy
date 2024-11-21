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
## Getting Started

First, run the development server:

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



