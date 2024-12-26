---
title: map与filter的区别
date: '2024-12-26'
---

# map 
Arrar 实例的map()方法创建一个新数组,填充了对调用数组中每个元素提供调用函数的结果
```javascript
const map1=  arr1.map((x)=>x*2)
```
## map 语法
map(callbackFn,thisArg)
- callbackFn 回调fn,要为数组中每个元素执行的函数，返回值作为单个元素添加到新数据中

- 数组中正在处理的当前元素
{} 默认代码块,不会自动返回值
- 返回新数组，每个元素都是回调函数的结果

map()方法是一种迭代方法，为数组中的每个元素调用一次提供的callbackFn函数,bing从结果构造一个新数组。

	1.	callbackFn 是回调函数：
	•	必须定义数组每个元素的转换逻辑。
	•	可以使用三个参数：当前值 (value)、索引 (index)、原数组 (array)。
	2.	thisArg 是可选上下文：
	•	指定回调函数中 this 的值。
	•	推荐只在需要共享上下文或外部状态时使用，否则直接使用箭头函数更简洁。

```
    const doubled = numbers.map(num => num * 2);
```
## 需要上下文使用this.Arg 
this.arg 指的是上下文的对象
其中完整示范

```
const context = {
    processedCount: 0, // 用于记录处理的元素数量
};
```

### 完整示范例子

```


const strings = ["apple", "banana", "cherry"];

// 使用 callbackFn 和 thisArg
const upperCaseStrings = strings.map(function (str) {
    this.processedCount++; // 增加计数
    return str.toUpperCase(); // 转换为大写
}, context);

console.log(upperCaseStrings); // 输出: ["APPLE", "BANANA", "CHERRY"]
console.log(context.processedCount); // 输出: 3
```



```
numbers.map(callbackFn, thisArg);

```
```javascript 
    const ma = [1,2,3]

    const t = ma.map(m=>{
        m*3
    })
    console.log(t)
```
## 无需返回对象,只返回计算结果
```
     const t = ma.map(m=>m*3)
     console.log(t)
```
## 代码块与对象
​     {} 对象里面有键,代码块在，
​     使用{}而不包括就会认为是一个对象。

# filter

对数组里面的元素进行过滤，将符合条件的数组元素筛选出来,重新形成一个新数组
```
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
```
## 语法

```
const newArray = array.filter(callbackFn, thisArg);

```
callbackFn (必需)：
一个回调函数，用于测试每个元素是否满足条件。如果 callbackFn 返回 true，则该元素会被保留；返回 false 则会被过滤掉。
它有以下参数：



- element：数组中当前被处理的元素。
- index (可选)：当前元素的索引。
- array (可选)：调用 filter 的原数组。

​	

## 使用filter 函数
```
const numbers = [10, 20, 30, 40, 50];

// 使用 filter 的 index 参数
const oddIndexNumbers = numbers.filter((num, index) => index % 2 !== 0);

console.log(oddIndexNumbers); // 输出: [20, 40]
```

