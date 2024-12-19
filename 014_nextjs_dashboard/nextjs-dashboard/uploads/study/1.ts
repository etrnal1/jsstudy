// 这段代码运行时会报错
// typescript 是静态类型,编译时就会报错
let foo: number =1  //声明
// foo.split(' ')
console.log(foo)  //使用
// 弱类型代码
console.log(1+'1') // 打印字符串

foo.toExponential

// : 指定变量的类型
function sayHello(person: string){
    console.log("玉龙打: "+person)
}

sayHello("志鹏");
let user = [1,2,3]
//sayHello(user); // 数组不能赋予字符串类型
// 原始数据类型
let isDone: boolean = false; 
// let createBoolean = new Boolean(1);
// let cs: boolean = new Boolean(1); // new 创造的对象不是布尔类型
//任意值
// number 
let notNumber: number = NaN; 
let shuzi: number = 6
let oct: number = 0o744 
// string 
let a: string= "hello world"
//${expr} 创建
let ts: string = `hello my name is ${a}`
console.log(ts)
