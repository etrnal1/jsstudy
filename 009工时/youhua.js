//这个是构造函数,使用构造函数传递对象。
function Person(name,age){

    this.name = name; //构造函数内的this 指向新小创建的对象
    this.age = age;
}
// 在原型上添加方法  【prototype】
Person.prototype ={
    constructor: Person,
    sayHello: function(){
        console.log(`Hello, my name is ${this.name}`);
    },
    getInfo: function(){
        return `${this.name},${this.age}岁`
    },
    birthday(){
        this.age++;
    }
}
// 创建子类  添加Student     

function Student(name,age,grade){
    // 调用父类构造函数
    Person.call(this,name,age);
    this.grade = grade;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
// 添加Student 方法
Student.prototype.study = function(){
    return `${this.name} 正在学习`;
}

// 使用示例

const alice = new Person("Alice",25);
const bob = new Student("Bob",18,"高三");

console.log(alice.sayHello());
console.log(alice.birthday());
console.log(bob.getInfo());
console.log(bob.study());
// 修复错误:
// 1. sayHello() 和 birthday() 方法没有返回值但在console.log中使用
// 2. 添加错误检查

function Person(name, age) {
    // 参数验证
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('Name must be a non-empty string');
    }
    if (typeof age !== 'number' || age < 0) {
        throw new Error('Age must be a positive number');
    }

    this.name = name;
    this.age = age;
}

Person.prototype = {
    constructor: Person,
    sayHello: function() {
        return `Hello, my name is ${this.name}`;
    },
    getInfo: function() {
        return `${this.name}, ${this.age}岁`;
    },
    birthday: function() {
        this.age++;
        return `${this.name} is now ${this.age} years old`;
    }
}

function Student(name, age, grade) {
    // 参数验证
    if (typeof grade !== 'string' || grade.trim() === '') {
        throw new Error('Grade must be a non-empty string');
    }
    
    Person.call(this, name, age);
    this.grade = grade;
}

// 重新运行示例代码
try {
    const alice = new Person("Alice", 25);
    const bob = new Student("Bob", 18, "高三");

    console.log(alice.sayHello());
    console.log(alice.birthday());
    console.log(bob.getInfo());
    console.log(bob.study());
} catch (error) {
    console.error("Error:", error.message);
}



