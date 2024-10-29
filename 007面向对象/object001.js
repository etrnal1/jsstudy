/**
 * 理解如何使用 JavaScript 提供的特性实现“经典”的面向对象编程。
 */
class Person{
    /**
     * 属性
     */
    name; 

    /**
     * @param {*} name
     * 需要name 的构造函数
     *
     * 创建一个新对象,将this绑定到这个新的对象,构造函数使用this 来引用
     * 执行构造函数中的代码
     * 返回新的函数 
     */
    constructor(name){
        this.name = name;
    }  

    /**
     *  使用this引用了对象的属性
     */
    instroSelf(){
        console.log(`Hi! I'm ${this.name}`);
    } 
}
console.log("我是类")
new Person("何云").instroSelf();