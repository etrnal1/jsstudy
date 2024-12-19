// 处理导航栏的逻辑
'use client'
import {
  UserGroupIcon,
  HomeIcon,BellIcon,BoldIcon,
  DocumentDuplicateIcon,AdjustmentsVerticalIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

// 定义多级菜单结构
const links = [
  { 
    name: '主页', 
    href: '/dashboard', 
    icon: HomeIcon 
  },
  {
    name: '发票管理',
    icon: DocumentDuplicateIcon,
    children: [
      { name: '发票列表', href: '/dashboard/invoices' },
      { name: '发票创建', href: '/dashboard/invoices/create' }
    ]
  },
  { 
    name: '消费者', 
    href: '/dashboard/customers', 
    icon: UserGroupIcon 
  },
  {
    name: '内容管理',
    icon: AdjustmentsVerticalIcon,
    children: [
      { name: '文章列表', href: '/dashboard/test' },
      { name: '视频管理', href: '/dashboard/video' }
    ]
  },
  {
    name: '系统管理',
    icon: BellIcon,
    children: [
      { name: '添加定时任务', href: '/dashboard/cut' },
      { name: "查看定时任务列表", href: "/dashboard/list" }
    ]
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isExpanded = expandedMenus.includes(link.name);

        if (!link.children) {
          // 渲染单层菜单
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                'sm:justify-start sm:px-3',
                'md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-purple-100 text-pink-600': pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-5 sm:w-6" />
              <p className="block text-xs sm:text-sm">{link.name}</p>
            </Link>
          );
        }

        // 渲染多层菜单
        return (
          <div key={link.name} className="flex flex-col w-full">
            <button
              onClick={() => toggleMenu(link.name)}
              className={clsx(
                'flex h-[48px] grow items-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                'sm:justify-start sm:px-3',
                'md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-purple-100 text-pink-600': link.children?.some(child => pathname === child.href),
                }
              )}
            >
              <LinkIcon className="w-5 sm:w-6" />
              <p className="block text-xs sm:text-sm">{link.name}</p>
              <ChevronDownIcon 
                className={clsx(
                  "w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ml-auto",
                  { "transform rotate-180": isExpanded }
                )}
              />
            </button>
            
            {isExpanded && (
              <div className="ml-4 sm:ml-6 md:ml-8">
                {link.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className={clsx(
                      'flex h-[40px] items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                      {
                        'bg-purple-100 text-pink-600': pathname === child.href,
                      }
                    )}
                  >
                    <p className="text-xs sm:text-sm">{child.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
