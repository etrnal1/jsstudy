'use server';
import bcrypt from 'bcrypt';
//获取验证组件
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import {z}  from 'zod';
import {sql} from '@vercel/postgres';
//于将 Route Segments 存储在用户的浏览器中一段时间。除了预取之外，此缓存还确保用户可以在路由之间快速导航，同时减少向服务器发出的请求数,由于您正在更新 invoices 路由中显示的数据，因此您需要清除此缓存并触发对服务器的新请求。您可以使用 Next.js 中的 revalidatePath 函数执行此操作：


import { revalidatePath } from 'next/cache';
// 此时，您还需要将用户重定向回 /dashboard/invoices 页面。您可以使用 Next.js 中的 redirect 函数执行此操作：

import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id:z.string(),
    customerId:z.string({
        invalid_type_error:'请选择一个选项'
    }),
    amount:z.coerce
            .number()
            .gt(0,{message:"请输入一个金额"}),
    status:z.enum(['pending','paid'],{
        invalid_type_error:'请选择一个用户状态'
    }),
    date:z.string(),
});
const CreateInvoice= FormSchema.omit({id:true,date:true})

// 定义一个State 类型
export type State ={
    errors:{
        customerId?:string[];
        amount?: string[];
        status: string[];

    };
    message?:string|null;
}
//创建接受formData的新异步函数
export async function createInvoice(prevState: State, formData: FormData) {
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    };

    // 验证表单数据
    const validatedFields = CreateInvoice.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "重要字段没填写,创建表格失败"
        }
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
        
        revalidatePath('/dashboard/invoices');
        redirect('/dashboard/invoices');
    } catch (error) {
        return {
            message: 'Database Error: failed to create invoice'
        }
    }
}

export async function updateInvoice (id:string,formData:FormData){
    // 进行数据验证
    const UpdateInvoice = FormSchema.omit({ id: true, date: true });

    // 获取id ,金额,状态
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
    const amountInCents= amount * 100; 
    await sql `
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');  
    
}
// 添加删除按钮

export async function deleteInvoice (id:string){
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    // 重定向
    revalidatePath('/dashboard/invoices');   
}
//定义登录函数


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }


//   signCreate

export async function signCreate(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    console.log("用户注册信息:", email, password);
    
    // 查询用户是否已存在
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return "用户已存在";
    }

    // 对密码进行加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 插入新用户
    await sql`
      INSERT INTO users (id, email, password, name)
      VALUES (${crypto.randomUUID()}, ${email}, ${hashedPassword}, ${email})
    `;

    return "注册成功";
  } catch (error) {
    console.error("注册错误:", error);
    return "注册失败，请稍后重试";
  }
}