// 服务器组件，用户获取客户并传递给Form组件，为了节省时间，创建form 组件
import Form from '@/app/ui/invoices/create-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {fetchCustomers} from '@/app/lib/data';
export default async function Page(){
    const customers =await fetchCustomers();
    console.log(customers,"获取表单信息")
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Invoices',href:'/dashboard/invoices'},
                { label: 'Create Invoice',
                    href: '/dashboard/invoices/create',
                    active: true,}
            ]}></Breadcrumbs>
            Hello 创建表单
    {/* Form组件  1.
    具有一个 <select> （下拉列表） 元素，其中包含客户列表。
    2.有一个 <input> 元素，用于 type=“number” 的金额。
    3.有两个 <input> 元素，用于 type=“radio” 的状态。
    4.有一个带有 type=“submit” 的按钮。
    */}
            <Form customers={customers}></Form>
        </main>
    )
}