//导入NextResponse 从next/server包
import { NextResponse } from 'next/server' 
//导出一个异步post处理函数
export async function POST(
    //接收两个参数
    request: Request,
    //路由参数
    {params}: {params: {slug: string}}
){
    // try catch 捕获错误
    try{

        // 返回成功响应
        return NextResponse.json({success: true})
    }catch(error){
        // 返回错误响应
        return NextResponse.json({error: 'Failed to favorite post'}, {status: 500})
    }
}