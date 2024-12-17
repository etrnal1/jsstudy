// 处理导航栏的逻辑
'use client'
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,AdjustmentsVerticalIcon
} from '@heroicons/react/24/outline';
import {usePathname} from 'next/navigation';
// clsx 导入页面
import clsx from 'clsx';
import Link from 'next/link';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: '主页', href: '/dashboard', icon: HomeIcon },
  {
    name: '发票',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: '消费者', href: '/dashboard/customers', icon: UserGroupIcon },
  {name: '发表文章',href:'/dashboard/test',icon:AdjustmentsVerticalIcon},
  {name: '处理视频',href:'/dashboard/video',icon:AdjustmentsVerticalIcon},
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          // className={clsx('默认样式', {
          //   '选中样式': pathname === link.href,
          // })}
          // {clsx('默认样式'),{选中样式}}
          
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-purple-100 text-pink-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
