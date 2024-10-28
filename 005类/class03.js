/**
 * 什么是对象 创建一个对象。对象拥有了一些数据和功能,你现在可以
 * 子命名空间
* 通过简单的语法访问它们了
 * 1. 命名类
 * 2. 类中创建变量，创建方法，创建静态方法
 * 3. new 对象,访问变量
 * 4. 自动化方法
 * 5. 定义静态方法，静态变量,访问变量
 * 6. 定义get 是属性 不加括号
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
    },
    ints: function(){
        console.log(`你好! 我是 ${this.name[1]}`)
    }
}
console.log("打印对象: ",person,person.bio())
console.log("打印年龄",person.age)
console.log("访问子空间对象",person.names.first )
person.ints()

class Animals {
    name 
    age 
    // 静态属性
    static private ="我是静态属性123"
    constructor(name, age) {
        this.age = age;
        this.name = name;
    }
    get Convert(){
        return "hello world"
    }

}

let orang = new Animals('小橘子',21);
console.log(orang,orang.name,orang.age,orang.name,orang.Convert,Animals.private)