import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function POST(req: NextRequest) {
    try {
        const { searchTerm, sortOrder } = await req.json()
        
        // 如果没有搜索词，直接返回空结果
        if (!searchTerm?.trim()) {
            return NextResponse.json({
                code: 200,
                data: [],
                message: "请输入搜索内容"
            })
        }

        // 获取 Markdown 文件目录
        const markDir = path.join(process.cwd(), '/data/')
        
        if (!fs.existsSync(markDir)) {
            throw new Error('文章目录不存在')
        }
        
        // 读取所有文件
        const files = fs.readdirSync(markDir)
        
        // 处理所有文章
        let results = files
            .map((file) => {
                const filePath = path.join(markDir, file)
                const fileContents = fs.readFileSync(filePath, 'utf-8')
                const { data, content } = matter(fileContents)
                
                // 确保日期格式正确
                const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString()
                
                return {
                    id: file.replace('.md', ''),
                    title: data.title || '无标题',
                    date: date,
                    content: content || '',
                    tags: data.tags || []
                }
            })
            // 搜索过滤 - 使用更严格的匹配规则
            .filter((post) => {
                const searchTerms = searchTerm.toLowerCase()
                    .split(/\s+/)
                    .filter(term => term.length > 0);

                // 检查标题和内容
                const titleLower = post.title.toLowerCase();
                const contentLower = post.content.toLowerCase();

                // 所有搜索词都必须匹配
                return searchTerms.every(term => {
                    // 使用词边界匹配
                    const wordBoundaryRegex = new RegExp(`\\b${term}\\b`, 'i');
                    return wordBoundaryRegex.test(titleLower) || 
                           wordBoundaryRegex.test(contentLower);
                });
            });

        // 添加调试日志
        console.log('搜索词:', searchTerm);
        console.log('匹配结果数:', results.length);

        // 排序处理
        if (sortOrder) {
            results.sort((a, b) => {
                const dateA = new Date(a.date).getTime()
                const dateB = new Date(b.date).getTime()
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            })
        }

        // 添加结果预览
        console.log('排序后的结果:', results.map(r => ({
            id: r.id,
            title: r.title,
            date: r.date
        })));

        return NextResponse.json({
            code: 200,
            data: results,
            message: results.length > 0 ? "搜索成功" : "未找到相关内容"
        })

    } catch (error) {
        console.error('搜索错误:', error)
        return NextResponse.json({
            code: 500,
            message: error instanceof Error ? error.message : "搜索失败"
        }, { status: 500 })
    }
}