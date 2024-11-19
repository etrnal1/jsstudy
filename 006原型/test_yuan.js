    // 创建一个自定义的原型对象
const personProto  = {
    sayHello(){
        return `Hello, my name is ${this.name}`
       
    },
    getInfo() {
        return `I am ${this.age} years old`
    }
}
// 使用 Object.create 创建基于自定义原型的新对象
const person = Object.create(personProto,{
    name: {value: "Alice",enumerable: true},
    age: {value: 25, enumerable: true}
})
// 测试原型链
console.log(person.sayHello())
console.log(person.getInfo())
console.log(Object.getPrototypeOf(person)===personProto);