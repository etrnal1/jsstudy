---
title: nextjs的路由和数据处理模式
date: 2024-12-20 04:48 pm
---

# nextjs 的路由

## 动态路由和查询参数的区别

```js
(?id=)
[动态路由]
```

基于文件系统的路由器，文件添加到pages 目录,自动作为索引使用



### Inedx Routes 索引路由

路由器会自动将`index`的文件路由到目录的根目录

`page/blog/index.js` /blog

### 嵌套路由



​	路由器支持嵌套文件。如果您创建嵌套文件夹结构，文件仍将以相同的方式自动路由。

- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`
    `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

 

### 动态路由 

​	[Dynamic route segments 动态路由段](https://www.nextjs.cn/docs/routing/introduction#dynamic-route-segments)

To match a dynamic segment, you can use the bracket syntax. This allows you to match named parameters.
要匹配动态区段，您可以使用 bracket 语法。这允许您匹配命名参数。

- `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
    `pages/blog/[slug].js` → `/blog/：slug` （`/blog/hello-world`）
- `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
    `pages/[用户名]/settings.js` → `/：username/settings` （`/foo/settings`）
- `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)
    `页/帖子/[...all].js` → `/post/*` （`/post/2020/id/title`）