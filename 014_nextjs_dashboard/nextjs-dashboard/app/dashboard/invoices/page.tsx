
// 添加fentch 

import { fetchInvoicesPages } from '@/app/lib/data';
// 添加搜索分页,为什么要使用URL搜索参数
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page(props:{
    searchParams?: Promise<{
        query?: string;
        page?: string;
      }>;
}

) {
    // 添加相关逻辑
    const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
    // 添加总的页面数据

const totalPages = await fetchInvoicesPages(query)
console.log("打印页面总条数",totalPages)
    //相关逻辑结束
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* 将totalPages传递给Pagination组件 */}
      
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}