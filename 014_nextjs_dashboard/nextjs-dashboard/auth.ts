// 用户登录需要通过该文件进行 验证
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
// 更新用户密码
export async function updateUserPassword(email: string, newPassword: string): Promise<void> {
  try {
    // 生成新密码的哈希
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新数据库中的密码
    await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE email = ${email}
    `;
    console.log('Password updated successfully for:', email);
  } catch (error) {
    console.error('Failed to update password:', error);
    throw new Error('Failed to update password.');
  }
}
// 获取相关用户email: string
async function getUser(email:string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    //const user = await sql<User>`SELECT * FROM users`;
    return user.rows[0];
   
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // 添加调试代码
          console.log('Attempting to login wiht: ',credentials)

          // 更新密码的逻辑
          // await updateUserPassword('user@nextmail.com', '1234567');
          // 添加查询所有用户
        // const result = await getUser('user@nextmail.com');
          //打印所有用户
        //  console.log('All users: ',result);
        //   return 0;
        //查看发过来的信息是否正确
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          console.log("验证成功",new Date());
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          console.log("查询到相关用户",user,new Date())
          if (!user) return null;
          //start
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // 这里返回了true
          console.log("查询到加密过的密码: ",passwordsMatch)
          if(passwordsMatch){
            const userObject = {
              id: user.id,
              email: user.email,
              name: user.name,
            };
            console.log('返回的用户对象:', userObject);
            return userObject;
          }

          //end
          
        }
         return null;
        
      

      
      },
    }),
  ],
});