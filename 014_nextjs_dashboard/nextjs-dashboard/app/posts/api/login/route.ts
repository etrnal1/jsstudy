import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pool from '../../lib/db'
/**
 * 
 * @param req 登录接口
 * @param res 
 * @returns 
 */
// 接待POST 请求
const SEKYE_KEY = "123456"
export async function POST(req: Request,res: NextResponse) {
    try {
        // 对象解析userName,passWord,解析json对
        const { userName, passWord } = await req.json();
        const [rows]: any = await pool.execute(
            'SELECT id, username, password FROM users WHERE email = ? OR username = ?',
            [userName, userName]
          );
          if (rows.length === 0) {
            return NextResponse.json(
              { error: '用户不存在' },
              { status: 401 }
            );
          }
          const user = rows[0];
          const isValid = await bcrypt.compare(passWord, user.password);
      
          if (!isValid) {
            return NextResponse.json(
              { error: '密码错误' },
              { status: 401 }
            );
          }

          const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
          );

          await pool.execute(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
            [user.id]
          );
      
          return NextResponse.json({
            success: true,
            token,
            user: {
              id: user.id,
              username: user.username
            }
          });
        if(userName=="1026177564@qq.com" && passWord=="w123"){

            const token = jwt.sign({userName},SEKYE_KEY,{expiresIn:'1h'})
            return NextResponse.json({token})

        }
        return NextResponse.json({message:"邮箱密码错误"})
        console.log("userName: ", userName);
        console.log("passWord: ", passWord);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}