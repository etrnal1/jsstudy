// 定义文章类型
export interface Post {
    title: string;
    description: string;
    excerpt: string;
    slug: string;
    date: string;
    content: string;  // 文章的详细内容
    tags?: string[];  // 可选的标签
  }
  
  // 精选文章数据
  export const FEATURED_POSTS: Post[] = [
    {
      title: "React 入门指南",
      description: "学习 React 开发的基础知识，包括组件、状态管理和生命周期",
      excerpt: "从零开始学习 React，掌握现代前端开发的必备技能",
      slug: "react-basics",
      date: "2024-03-20",
      content: `
        React 是一个用于构建用户界面的 JavaScript 库。
        
        ## 为什么选择 React？
        
        - 组件化开发
        - 虚拟 DOM
        - 丰富的生态系统
        
        ## 核心概念
        
        1. 组件
        2. Props
        3. State
        4. 生命周期
        
        ## 开始使用
        
        首先需要安装 Node.js 和 npm...
      `,
      tags: ["React", "JavaScript", "前端开发"]
    },
    {
      title: "Next.js 13 新特性解析",
      description: "深入了解 Next.js 13 的 App Router 和服务器组件",
      excerpt: "探索 Next.js 13 带来的革命性变化，了解新一代 React 框架的强大功能",
      slug: "nextjs-13-features",
      date: "2024-03-21",
      content: `
       # Next.js 13 重大更新

       Next.js 13 带来了革命性的更新，让我们深入探讨这些新特性。

       ## App Router（应用路由器）

       新的目录结构带来了更直观的路由体验：

       - 基于文件系统的路由
       - 嵌套路由支持
       - 动态路由增强
       - 平行路由

       ## 服务器组件

       默认启用的服务器组件带来了显著的性能提升：

       1. 减少客户端 JavaScript
       2. 改善首次加载性能
       3. 自动代码分割

       ## 数据获取

       简化的数据获取方式：

       \`\`\`typescript
       // 服务器组件中的数据获取
       async function getData() {
         const res = await fetch('https://api.example.com/data')
         return res.json()
       }
       \`\`\`
       `,
      tags: ["Next.js", "React", "服务器组件"]
    },
    {
      title: "TypeScript 最佳实践",
      description: "提高代码质量的 TypeScript 使用技巧和模式",
      excerpt: "通过实际案例，学习 TypeScript 的高级特性和最佳实践",
      slug: "typescript-best-practices",
      date: "2024-03-22",
      content: `
        TypeScript 不仅仅是添加类型，更是提升代码质量的利器。
        
        ## 类型系统
        
        - 基础类型
        - 高级类型
        - 类型推断
        
        ## 最佳实践
        
        1. 接口优于类型别名
        2. 善用泛型
        3. 严格的空值检查
        
        ## 常见陷阱
        
        避免这些常见的 TypeScript 错误...
      `,
      tags: ["TypeScript", "JavaScript", "编程技巧"]
    }
  ];
  
  // 获取所有文章
  export const getAllPosts = (): Post[] => {
    return FEATURED_POSTS;
  };
  
  // 根据 slug 获取单篇文章
  export const getPostBySlug = (slug: string): Post | undefined => {
    return FEATURED_POSTS.find(post => post.slug === slug);
  };
  
  // 获取所有标签
  export const getAllTags = (): string[] => {
    const tags = new Set<string>();
    FEATURED_POSTS.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };