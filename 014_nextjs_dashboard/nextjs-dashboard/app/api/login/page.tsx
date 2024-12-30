import { NextResponse } from "next/server";

// 接待POST 请求
export async function POST(request:Request){

    return NextResponse.json({error:'Inter'},{status:500})

}