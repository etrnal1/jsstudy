// 启用异步
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from "@/app/ui/fonts";
// 获取 RevenueChart 组件的数据
import LatestInvoices from '../ui/dashboard/latest-invoices';
// 导入折线图组件
import RevenueChart from '../ui/dashboard/revenue-chart';
// 导入查询函数进行查询
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Revenue } from '@/app/lib/definitions';  // 假定您已经定义了这些类型

// page 是一个服务端组件，使用 async 获取数据
export default async function Page() {
    try {
        // 使用 Promise.all 来并行获取数据
        const [revenueData, latestInvoices, cardData] = await Promise.all([
            fetchRevenue(),
            fetchLatestInvoices(),
            fetchCardData(),
        ]);

        // 解构 cardData 以获取具体值
        const {
            numberOfInvoices,
            numberOfCustomers,
            totalPaidInvoices,
            totalPendingInvoices,
        } = cardData;

        // 页面正常渲染返回
        return (
            <main>
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card title="Student" value={totalPaidInvoices} type="collected"/>
                    <Card title="Pending" value={totalPendingInvoices} type="pending" />
                    <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                    <Card title="Total Customers" value={numberOfCustomers} type="customers" />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    <RevenueChart data={revenueData} />
                    <LatestInvoices latestInvoices={latestInvoices} />
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // 错误处理返回
        return <p>Error loading data, please try again later.</p>;
    }
}