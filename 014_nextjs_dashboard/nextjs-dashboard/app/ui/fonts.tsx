// 编写next js 里面的一些font字体
import {Inter} from 'next/font/google'
import { Lusitana } from 'next/font/google';

export const inter = Inter({subsets:['latin']});
export const lusitana = Lusitana({
    subsets: ['latin'], // 配置字符集（根据需求选择 'latin', 'cyrillic' 等）
    weight: ['400', '700'], // 配置字体粗细
  });
// 编写完成后在layout.js里面进行加载