import { NextResponse } from 'next/server' 
import bcrypt from 'bcrypt' 
// 导入默认数据库链接
import pool from '../../lib/db'; 
export async function POST(request: Request) {

    try{
        // const dt=await request.json()

        console.log("click register interface")
        //console.log(username,email,password)
       // const username="小白"
        const  {email,password} = await request.json();
       // console.log(pool);

       // 检查用户名是否存在

       const  [existing]: any = await pool.execute('SELECT * FROM users WHERE email = ?',[email]);
       if(existing.length>0){

       return NextResponse.json(
                    { error: '用户名或邮箱已存在' },
                    { status: 400 }
                );
       }
       // 加密密码
       const hashedPassword = await bcrypt.hash(password,10); 

       const [result]:any=await pool.execute('INSERT INTO users (email,password) VALUES (?,?)',[email,hashedPassword]);

        // await pool.execute('INSERT INTO users (email,password) VALUES (?,?)',[email,password]);

        return NextResponse.json({
            success: true,
            user: {
              id: result.insertId,  
              email
            }
          });
    }catch(error){
        console.error('注册失败',error)
        return NextResponse.json({error:'注册失败'},{status:500})
    }
}