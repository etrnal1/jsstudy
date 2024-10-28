{} 对象,容器,往容器里面填写代码

函数是什么

函数可以是对象，可以保存至，可以作为参数
传递给其他函数当参数


对象的原型

// 创建一个简单对象
const obj = {
    name: "Alice",
    age: 25
};

// 访问对象自身的属性
console.log(obj.name);  // 输出: Alice
console.log(obj.age);   // 输出: 25

// 访问继承自 Object.prototype 的方法
console.log(obj.toString());  // 输出: [object Object]

// 验证 obj 的原型链是否指向 Object.prototype
console.log(Object.getPrototypeOf(obj) === Object.prototype);  // 输出: true

// 使用 Object.prototype.hasOwnProperty 来检查属性是否是自身的属性
console.log(obj.hasOwnProperty("name"));  // 输出: true
console.log(obj.hasOwnProperty("toString"));  // 输出: false (toString 是继承来的)

## 作用域


## 
/**
 * 什么是对象 创建一个对象。对象拥有了一些数据和功能,你现在可以
 * 1. 子命名空间
 * names:{
        first:"bOB",
        last:"heyun"
    },
    访问子命名空间,使用.
    2. this 的含义
    this 指向的是对象本身
    3. 构造函数工作的流程..
    (1) 创建新对象，
    (2) 将this 绑定到新对象
    (3) 运行构造函数中的代码
    (4) 返回新对象
    4. 点表示法
       使用. 表示法 
        myString.split(",")
    5.理解  myString.split(",") 这个过程
      当创建字符串的时候，会自动生成字符串的实例子，然后就可以钓鱼字符串的方法。
    
 */

 ## 理解什么是原型,原型链如何工作,以及如何为一个对象设置原型