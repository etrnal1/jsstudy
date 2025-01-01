---
title: 'typescript 类型注释'
date: '2024-12-31' 
---





从您上传的图片中可以看出，这段代码使用的是 **TypeScript** 中的语法，尤其是类型注解的部分。



# **语法特点分析**

​	1.**函数参数的类型定义**



(order: 'asc' | 'desc')

- order 是参数名。
- : 'asc' | 'desc' 表示 order 参数的类型是 **联合类型**，只能是字符串 'asc' 或 'desc'。



​	2.	**箭头函数**



const handleSort = (order: 'asc' | 'desc') => { ... }



- 使用箭头函数定义了 handleSort 函数。
- 箭头函数是 ES6 的一种语法形式，用来简化函数的定义。



​	3.	**函数体**

```tsx
{

  setSortOrder(order)

  applyFilters(searchTerm, currentTag, order)

}
```







- ​		函数体是用花括号 {} 包围的代码块，执行一些操作。
- ​		setSortOrder 和 applyFilters 看起来是两个调用的函数，可能是某种状态管理或过滤逻辑的实现。



**使用场景**



这种语法常用于前端开发，特别是在使用 React 和 TypeScript 时：

- 限制函数参数的值范围，提升类型安全性。
- 结合箭头函数，提高代码的简洁性和可读性。



**示例改写**



假设我们在 React 中有类似的需求：

```tsx
const handleSort = (order: 'asc' | 'desc') => {
  setSortOrder(order) // 更新排序状态
  applyFilters(searchTerm, currentTag, order) // 重新应用过滤器
}
```





