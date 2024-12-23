let  number= [1,2,3,4,5]
const result = number.filter(item=>item>1) 

console.log(result)
// 表示里面的原始是字符串
let arrs: Array<string> = ['1','2','3']

console.log("打印数组",arrs)
let t1: [number,string,number] = [1,'2',1]
console.log("打印元祖",t1)

 //枚举类型 enum
// 默认从0开始
 enum MyEnum {
    A,
    B,
    C
 }
//  获取值
 console.log(MyEnum.A);

 console.log(MyEnum[0])
 // void  null 和undefind 
 /**
  * 
  * @param a number
  * @param b number
  * @returns number
  */
 function MyFn(a: number,b: number,...rest: number[]): number{
    return a+b
 }

 // 接口 定义对象
 const obj = {
    name:1 ,
    age:2 
 }
// 声明一个对象和类型
 interface Obj{
    name: string,
    age: number 
 }
 // 定义多类型
 type MyUserName = string |number

 // ts 支持类型智能判断;
 function myFn<T>(a: T,b: T): T[]{
    return [a,b]
 }
