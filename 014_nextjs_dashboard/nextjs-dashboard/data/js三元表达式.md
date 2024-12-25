---
title: js三元表达式
date: '2024-12-24'
---

# 格式
    condition表达式条件为真执行:前面的的,否则执行:后面的
```
 condition?expressTrue:expressFalse
```
## 函数使用示例子
```javascript
    function test(title){
        return title?'title':'123'
    }
```

## 处理空值

```javascript
   // person 传递一个对象
    function testName(person){
        const new = person ? person.name: 'hello'
        return `${new}` 
    }
    
    console.log(testName({name:"zhao"}))

    cosole.log(testName(null))


```

