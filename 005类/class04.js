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

const person = {
    name: ["Bob","Smith"],
    names:{
        first:"bOB",
        last:"heyun"
    },
    age: 32,
    bio: function(){
        console.log(`${this.name[0]}`)
        console.log("我是对象",this,"this的类型: ",typeof this)
    },
    ints: function(){
        console.log(`你好! 我是 ${this.name[1]}`)
    }
}
// 更新对象成员 
person.names.first="何云"
console.log(person.names.first)
person.eyes = "hazel"
person.farewall = function(){
    console.log(`${this.eyes}`,"再见")
}
person.farewall()
person.bio()