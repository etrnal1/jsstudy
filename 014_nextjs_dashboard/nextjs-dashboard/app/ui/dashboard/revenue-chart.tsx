//工具函数 生成y标签
import { generateYAxis } from '@/app/lib/utils';
// 使用 @heroicons 提供的图标，用作 UI 装饰。
import { CalendarIcon } from '@heroicons/react/24/outline';
// 特定字体的样式。
import { lusitana } from '@/app/ui/fonts';
// 用于获取收入数据的异步函数 
import { Revenue } from '@/app/lib/definitions'
import { fetchRevenue } from '@/app/lib/data';

// 	•	interface：用来定义一个接口，接口是 TypeScript 中的核心概念，用于描述对象的结构。
	// •	RevenueChartProps：接口的名称，通常用来表示某个 React 组件的 props 类型。
	// •	data: Revenue[]：
	// •	data 是 props 中的一个字段名称。
	// •	Revenue[] 表示 data 的类型是一个数组，数组的每个元素都必须是 Revenue 类型。
interface RevenueChartProps {
  data: Revenue[];
}
// 异步组件，使用 fetchRevenue() 来获取收入数据。//•	revenue 是数据源，假设是一个数组，每个元素包含收入和月份。
export default async function RevenueChart({data}:RevenueChartProps) {
  const revenue = await fetchRevenue();

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(data);

  if (!data ||data.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* Y-axis */}
          <div className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex">
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(month.revenue / topLabel) * chartHeight}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}