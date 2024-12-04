'use server';
//获取验证组件

import {z}  from 'zod';
import {sql} from '@vercel/postgres';
//于将 Route Segments 存储在用户的浏览器中一段时间。除了预取之外，此缓存还确保用户可以在路由之间快速导航，同时减少向服务器发出的请求数,由于您正在更新 invoices 路由中显示的数据，因此您需要清除此缓存并触发对服务器的新请求。您可以使用 Next.js 中的 revalidatePath 函数执行此操作：


import { revalidatePath } from 'next/cache';
// 此时，您还需要将用户重定向回 /dashboard/invoices 页面。您可以使用 Next.js 中的 redirect 函数执行此操作：

import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id:z.string(),
    customerId:z.string(),
    amount:z.coerce.number(),
    status:z.enum(['pending','paid']),
    date:z.string(),
});
const CreateInvoice= FormSchema.omit({id:true,date:true})
//创建接受formData的新异步函数
export async function createInvoice(formData:FormData){
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
    const amountInCents= amount * 100;

    const date =new Date().toISOString().split('T')[0];
    // sql 导入相关数据

    await sql `
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    revalidatePath('/dashboard/invoices');
    
    redirect('/dashboard/invoices');

    // 获取form属性
    // const rawFormData ={
    //     customeId:formData.get('customeId'),
    //     amout:formData.get('amout'),
    //     status:formData.get('status'),
    // };

    // console.log(rawFormData,new Date());
    // console.log(typeof rawFormData.amout,new Date());
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
    console.log("我进行了香瓜参数边距")
}