'use client'; // 客户端组件，意味着可以使用事件侦听器和钩子

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
//从 'next/navigation' 导入 useSearchParams 钩子，并将其分配给一个变量：
import { useSearchParams,usePathname,useRouter } from 'next/navigation';
// 添加防抖动
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // 2. 添加一个变量
  const searchParams = useSearchParams();
  // 3. 添加pathName 
  const pathname = usePathname(); 

  //添加replace 

  const {replace} = useRouter();
  // 1. 添加一个搜索按钮™ 用户停止300ms 后特定的时间运行代码 

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
   
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
 
 

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {/* 这是输入框 e 获取Input的值传递*/}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}

        onChange={(e)=>{handleSearch(e.target.value)}}

        defaultValue= {searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
