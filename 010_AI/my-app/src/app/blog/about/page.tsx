// 1. 导入必要的依赖
import { FC } from 'react';
import { Navbar } from '@/components/Navbar';
// 2. 定义关于页面组件
const AboutPage: FC = () => {
  return (
    <><Navbar />
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold mb-6">关于我们</h1>
      
      {/* 主要内容区域 */}
      <div className="prose max-w-none">
        {/* 博客介绍 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">博客介绍</h2>
          <p className="text-gray-600 leading-relaxed">
            欢迎来到我的个人博客！这里是我分享技术见解、学习心得和个人感悟的地方。
            通过这个平台，我希望能与更多志同道合的朋友交流和分享。
          </p>
        </section>

        {/* 博主介绍 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">博主介绍</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 leading-relaxed mb-4">
              我是一名热爱技术的开发者，专注于Web开发和人工智能领域。
              平时喜欢研究新技术，关注技术发展动态，并乐于分享学习经验。
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>技术栈：React, TypeScript, Next.js</li>
              <li>工作经验：5年+</li>
              <li>感兴趣领域：Web开发、AI应用、开源项目</li>
            </ul>
          </div>
        </section>

        {/* 联系方式 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">联系方式</h2>
          <div className="flex flex-col gap-2 text-gray-600">
            <p>Email: example@email.com</p>
            <p>GitHub: github.com/yourusername</p>
            <p>微信公众号: TechBlog</p>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

{/* 
这个页面的样式主要通过 Tailwind CSS 实现，无需额外引入 CSS 文件。
以下是使用的主要 Tailwind 类名说明：

1. 布局相关：
- container: 响应式容器
- mx-auto: 水平居中
- px-4: 左右内边距
- py-8: 上下内边距
- mb-4/mb-6/mb-8: 下外边距
- gap-2: 元素间距

2. 文本相关：
- text-3xl: 文字大小
- text-2xl: 二级标题大小
- font-bold/font-semibold: 文字粗细
- text-gray-600: 文字颜色
- leading-relaxed: 行高

3. 背景和边框：
- bg-gray-50: 背景颜色
- rounded-lg: 圆角

4. 其他：
- prose: 用于文章排版的工具类
- list-disc: 无序列表样式
- list-inside: 列表项缩进

Tailwind CSS 是一个功能类优先的 CSS 框架，通过组合这些预定义的类名，
可以快速构建出美观的页面布局，无需编写传统的 CSS。
*/}
{/* 
Tailwind CSS 在 Next.js 项目中的工作原理：

1. 项目配置：
- Next.js 项目创建时通常会自动配置 Tailwind CSS
- 需要在项目根目录有 tailwind.config.js 和 postcss.config.js 配置文件
- 在 globals.css 中需要引入 Tailwind 的基础样式:
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

2. 自动加载过程：
- Next.js 在构建时会自动处理 Tailwind CSS
- PostCSS 插件会扫描所有的 JSX/TSX 文件
- 只生成实际使用到的 CSS 类，优化打包体积
- 在开发模式下支持热重载
- 在生产模式下会自动压缩和优化 CSS

3. 工作流程：
- 开发时直接在 JSX 中使用 Tailwind 类名
- Next.js 的构建系统自动处理依赖关系
- 不需要手动引入任何 CSS 文件
- 支持自定义配置和扩展
*/}


// 3. 导出组件
export default AboutPage;
