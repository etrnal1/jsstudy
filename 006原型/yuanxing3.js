/**
 * 当我们调用 getYear() 时，浏览器首先在 myDate 中寻找具有该名称的属性，如果 myDate 没有定义该属性，才检查原型。因此，当我们给 myDate 添加 getYear() 时，就会调用 myDate 中的版本。
 * 这被称为属性的遮蔽
 */
const myDate  = new Date(1995,  4, 5);
console.log(myDate.getYear())

myDate.getYear = function(){
    console.log("我喜欢何云! ");
}
myDate.getYear();
/**
 *  设置原型
 *  Object.create()
 *  允许你指定一个将被用作新 对象原型的对象。


 */
 const person = {
    greet(){
        console.log("hello world!")
        // console.log(`你好你好 我的名字是 ${this.name}!`)
    }
 }

//  console.log(person.greet());

const personb = Object.create(person);

personb.greet();

/**
 * 使用构造函数,
 * 创建personP 对象
 * 创建Person函数，初始化要创建人物的对象
 * 将person 函数绑定到personP 属性,使用Object.assign 
 */
const personP = {
    greet(){
        console.log(`${this.name}`)
    },
};
// Person 创建的对象将获取Personp 为原型，自动获取personP 的方法
function Person(name){
        this.name = name;
}
// new Person的时候会绑定对象到this上,并初始化name
Object.assign(Person.prototype,personP)


/**
 * 本文介绍了 JavaScript 对象原型，包括原型对象链如何允许对象相互继承特性，原型属性以及如何使用它来为构造函数添加方法，以及其他相关主题。
 */

