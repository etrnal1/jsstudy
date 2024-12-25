---
title: js 模块化
date: '2024-12-14 17:14'
---

# js 模块化

​         JavaScript 程序本来很小——在早期，它们大多被用来执行独立的脚本任务，在你的 web 页面需要的地方提供一定交互，所以一般不需要多大的脚本。过了几年，我们现在有了运行大量 JavaScript 脚本的复杂程序，还有一些被用在其他环境（例如 Node.js）。 复杂的项目需要一种将 JavaScript 程序拆分为可按需导入的单独模块的机制。Node.js 已经提供这个能力很长时间了，还有很多的 JavaScript 库和框架已经开始了模块的使用（例如，CommonJS 和基于 AMD 的其他模块系统，如 RequireJS、webpack 和 Babel）。

## 导出

### 分片导出

```javascript
	export const name = "square"; 
	export function draw(ctx, length, x, y, color) {  				        ctx.fillStyle = color;  ctx.fillRect(x, y, length, length);   				
	   return { length, x, y, color };
  
  }
```





​		

### 默认导出

​	

```
export { name, draw, reportArea, reportPerimeter };
```



## 导入

### 具体导入

### 全部导入

## 具名

## 默认