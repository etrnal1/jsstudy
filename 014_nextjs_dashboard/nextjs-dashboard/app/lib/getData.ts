

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

export type Post = {
    id: string;
    title: string;
    date: string;
    content?: string;
}

// 使用 React cache 优化数据获取
export const getData = cache(async (): Promise<Post[]> => {
    const postsDirectory = path.join(process.cwd(), 'data')
    const fileNames = fs.readdirSync(postsDirectory)
    
    const allPostsData = fileNames.filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const id = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            
            const matterResult = matter(fileContents)
            
            // 格式化 Markdown 内容
            const content = matterResult.content
                // 标题转换
                .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
                .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold my-3">$1</h2>')
                .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium my-2">$1</h3>')
                // 列表转换
                .replace(/^\* (.*$)/gm, '<li class="list-disc ml-4">$1</li>')
                .replace(/^- (.*$)/gm, '<li class="list-disc ml-4">$1</li>')
                .replace(/^[0-9]+\. (.*$)/gm, '<li class="list-decimal ml-4">$1</li>')
                // 引用和强调
                .replace(/^\> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 my-2">$1</blockquote>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                // 代码块
                .replace(/```(.*?)\n([\s\S]*?)```/gm, '<pre class="bg-gray-100 p-4 rounded-lg my-4"><code class="language-$1">$2</code></pre>')
                .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
                // 链接
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
                // 段落和换行
                .split('\n\n').map(paragraph => {
                    if (paragraph.trim().startsWith('<')) {
                        return paragraph; // 已经是HTML标签的内容保持不变
                    }
                    return `<p class="my-2">${paragraph.replace(/\n/g, '<br />')}</p>`;
                }).join('\n')

            return {
                id,
                title: matterResult.data.title,
                date: matterResult.data.date,
                content: content
            }
        })
    
    // 按日期降序排序
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
})

// 获取单篇文章的函数也使用缓存
export const getPost = cache(async (id: string): Promise<Post | null> => {
    try {
        const fullPath = path.join(process.cwd(), 'data', `${id}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        
        const matterResult = matter(fileContents)
        
        // 使用相同的格式化逻辑
        const content = matterResult.content
            // 标题转换
            .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold my-3">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium my-2">$1</h3>')
            // 列表转换
            .replace(/^\* (.*$)/gm, '<li class="list-disc ml-4">$1</li>')
            .replace(/^- (.*$)/gm, '<li class="list-disc ml-4">$1</li>')
            .replace(/^[0-9]+\. (.*$)/gm, '<li class="list-decimal ml-4">$1</li>')
            // 引用和强调
            .replace(/^\> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 my-2">$1</blockquote>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            // 代码块
            .replace(/```(.*?)\n([\s\S]*?)```/gm, '<pre class="bg-gray-100 p-4 rounded-lg my-4"><code class="language-$1">$2</code></pre>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
            // 链接
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
            // 段落和换行
            .split('\n\n').map(paragraph => {
                if (paragraph.trim().startsWith('<')) {
                    return paragraph;
                }
                return `<p class="my-2">${paragraph.replace(/\n/g, '<br />')}</p>`;
            }).join('\n')

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            content: content
        }
    } catch (error) {
        return null
    }
})