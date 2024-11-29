// 启用异步
import {Card} from '@/app/ui/dashboard/cards';
import { lusitana } from "@/app/ui/fonts"
// 获取RevenueChart组件的数据
import LatestInvoices from '../ui/dashboard/latest-invoices';
// 导入折线图组件
import RevenueChart  from '../ui/dashboard/revenue-chart';
// 导入查询函数进行查询
import {fetchRevenue,fetchLatestInvoices,fetchCardData} from '@/app/lib/data'


// page 是一个服务端组件，使用await 获取数据
export default async function Page(){
    // 编写逻辑部分 
    const revenue = await fetchRevenue()
    // console.log(revenue);
    // const latestInvoices = await fetchLatestInvoices();
    const latestInvoices = await fetchLatestInvoices();
    console.log("获取最近五条数据", latestInvoices)
    //return false;
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } =await fetchCardData();
    //编写 组件部分
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* 填写Card 布局页面 */}
            <Card title="Student" value={totalPaidInvoices} type="collected"/>

            <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
        {/* card风格结束 */}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {/* 填写折线图问题 */}

            <RevenueChart revenue={revenue} />
            <LatestInvoices latestInvoices={latestInvoices} />
            </div>
        </main>

    )
   
}