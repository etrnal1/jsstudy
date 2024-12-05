// 创建一个名为[id]的新动态路由
// table 组件中,有一个updateInvoke 按钮，用于从表记录中接受发票的ID
// 查看 /app/ui/invoices/button.tsx 将Id 进行传输

// 从页面参数中获取发票id 
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// 导入一个名为 fetchInvoiceById 的新函数，并将 id 作为参数传递。
//导入 fetchCustomers 以获取下拉列表的客户名称。
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
//导入404 功能页面
import {notFound} from 'next/navigation'
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const id = params.id;

    console.log('从url里面获取到相关参数',id);

    //你可以使用 Promise.all 来并行获取 invoice 和 customers
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);
      //如果查找不到记录，调用404界面
    if(!invoice){
      notFound();
    }
    // return false;
  return (
    // 从页面参数读取发票ID 
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}