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