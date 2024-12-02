// 建立在Suspense之上特殊的netx.js 文件。允许回退UI
// 导入相关组件
import DashboardSkeleton from "../../ui/skeletons" //加载骨架，显示用户动态正在加载


//loading.tsx 比其他界面高一个级别
export default function Loading(){
    return <DashboardSkeleton />;
}