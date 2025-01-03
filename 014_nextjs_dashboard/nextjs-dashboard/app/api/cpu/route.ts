import { NextRequest,NextResponse } from "next/server";
import os from 'os'
export function GET(){
    NextResponse.json({
        message:"查询cpu成功",
        code:200
    })
}