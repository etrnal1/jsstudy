'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  // 使用 useRouter 钩子来获取路由对象
  // 使用 useState 钩子来管理刷新状态
  // 定义 handleRefresh 函数来处理刷新操作
  // 在 handleRefresh 函数中，首先将 isRefreshing 状态设置为 true
  // 调用 router.refresh() 方法来刷新当前页面数据
  // 使用 setTimeout 在 1 秒后将 isRefreshing 状态重置为 false
  const handleRefresh = () => {
    setIsRefreshing(true);
    // 刷新当前页面数据
    router.refresh(); //触发Next.js 重新获取服务器组件
    console.log("刷新数据");
    
    // 1秒后重置状态
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

         <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon 
            className={clsx(
              'h-5 w-5 transition-colors duration-200',
              {
                'text-gray-500': !isRefreshing,
                'text-blue-500': isRefreshing,
                'animate-spin': isRefreshing,
              }
            )} 
          />
          <h3 
            className={clsx(
              'ml-2 text-sm cursor-pointer transition-colors duration-200',
              {
                'text-gray-500 hover:text-gray-700': !isRefreshing,
                'text-green-500': isRefreshing,
              }
            )}
            onClick={handleRefresh}
          >
            点击现在更新
          </h3>
          <button 
     onClick={() => router.push('/test')}
     className="ml-4 text-sm text-gray-500 hover:text-gray-700"
   >
     test
   </button>
        </div>
      </div>
    </div>
  );
}
