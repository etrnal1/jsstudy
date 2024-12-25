// 查询api
import {NextRequest,NextResponse} from 'next/server'
import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';

// 请求搜索api
export async function POST(req:NextRequest){
    try {
        // 获取请求体中搜索关键字
        const {searchTerm} = await req.json()
        
        // 定义Markdown目录
        const markDir = path.join(process.cwd(),'/data/')
        
        // 检查目录是否存在
        if (!fs.existsSync(markDir)) {
            throw new Error('目录不存在')
        }
        
        // 读取所有文件
        const files = fs.readdirSync(markDir)
        
        // 遍历文件读取内容和元数据
        const results = files
            .map((file) => {
                const filePath = path.join(markDir, file)
                const fileContents = fs.readFileSync(filePath, 'utf-8')
                const {data, content} = matter(fileContents)
                
                return {
                    id: file.replace('.md', ''),
                    title: data.title || '',
                    date: data.date || '',
                    content: content || '',
                }
            })
            .filter((post) => {
                if (!searchTerm) return true
                
                const searchContent = searchTerm.toLowerCase()
                return (
                    post.title.toLowerCase().includes(searchContent.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchContent.toLowerCase())
                )
            })

        return NextResponse.json({
            code: 200,
            data: results,
            message: "搜索成功"
        })

    } catch (error) {
        return NextResponse.json({
            code: 500,
            message: error instanceof Error ? error.message : "搜索失败"
        }, {status: 500})
    }
}

export async function GET(req:NextRequest){
    const searchParams = new URL(req.url).searchParams
    const query = searchParams.get('q')
    
    if (!query) {
        return NextResponse.json({
            code: 400,
            message: "缺少搜索参数"
        }, {status: 400})
    }

    try {
        const markDir = path.join(process.cwd(),'/data/')
        const files = fs.readdirSync(markDir)
        
        const results = files
            .map((file) => {
                const filePath = path.join(markDir, file)
                const fileContents = fs.readFileSync(filePath, 'utf-8')
                const {data, content} = matter(fileContents)
                
                return {
                    id: file.replace('.md', ''),
                    title: data.title || '',
                    date: data.date || '',
                    content: content || '',
                }
            })
            .filter((post) => {
                const searchContent = query.toLowerCase()
                return (
                    post.title.toLowerCase().includes(searchContent) ||
                    post.content.toLowerCase().includes(searchContent)
                )
            })

        return NextResponse.json({
            code: 200,
            data: results,
            message: "搜索成功"
        })
        
    } catch (error) {
        return NextResponse.json({
            code: 500, 
            message: error instanceof Error ? error.message : "搜索失败"
        }, {status: 500})
    }
}