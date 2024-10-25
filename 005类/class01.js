// class 声明类, 声明属性 直接标量命名 age,card 
// 初始化函数 constructor 
class Student {
    // 定义静态属性
    static displayName = "point"

    static distance(a,b){
        return a - b;
    }
    constructor(age,card) {
        this.age = age ;
        this.card=card;
    }
    // 访问get 方法
    get area(){
        return this.calcArea();
    }

    calcArea(){
        return this.age * this.card
    }
}

let t= new Student(10,20)
console.log("访问学生属性: ",t.age,t.card)

console.log("访问get area方法: ",t.area)


console.log("访问静态属性值",Student.displayName)

console.log("访问静态方法",Student.distance(20-5))