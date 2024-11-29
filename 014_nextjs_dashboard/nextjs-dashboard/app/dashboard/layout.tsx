import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        {/* 小屏幕 侧边栏占满容器  侧边栏固定,不随内容伸缩 中等及以上屏幕,侧边栏宽度固定为16 rem*/}
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      {/* 让主内容区域占用 */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}