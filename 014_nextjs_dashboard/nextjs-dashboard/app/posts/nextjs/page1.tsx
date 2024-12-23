/**
 * 用户界面 用户如何使用您的应用程序并与之交互
 * 路由  用户如何在应用程序的不同部分之间导航
 * 数据获取
 * 渲染
 * 集成
 * 基础设施
 * 性能
 * 开发人员体验
 */
// recat 使用一个构建交互式用户界面的javascript 库
// 用户界面(UI) 是指用户在屏幕上看到并与之交互的元素

//next 是react 的一个框架，提供应用程序的构建块
// 框架是指next.js处理react所需的工具和配置

// 上面的代码是命令式编程的一个很好的例子。您正在编写有关如何更新用户界面的步骤。但是，在构建用户界面时，通常首选声明式方法，因为它可以加快开发过程。如果开发人员能够声明他们想要显示的内容（在本例中，带有一些文本的 h1 标签），而不是编写 DOM 方法，那将会很有帮助。

// 换句话说，命令式编程就像给厨师分步指导如何制作披萨。声明式编程就像订购披萨，而不关心制作披萨所需的步骤。🍕

// 什么是jsx 

// JSX 是 JavaScript 的语法扩展，允许您使用熟悉的类似 HTML 的语法来描述 UI。JSX 的好处是，除了遵循三个 JSX 规则外，您不需要学习 HTML 和 JavaScript 之外的任何新符号或语法。

// 但是浏览器不能立即理解 JSX，因此您需要一个 JavaScript 编译器（例如 Babel）来将您的 JSX 代码转换为常规 JavaScript。

// 箭头函数

const marry = ['Hy','py','Jd']

console.log(marry.map((ma)=>(ma.length)))
