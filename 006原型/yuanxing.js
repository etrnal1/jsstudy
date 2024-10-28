/**
 * 声明对象
 * 对象有属性，有方法
 * 
 * 使用this 
 * 访问对象用.表示符
 * 所有对象都有一个内置属性,原型链终止于拥有null 最为其原型的对象上
 *  q: 调用myObject.toString(),对象都做了什么 : 
 * a: 现在MyObject 寻找,找不到在原型对象中寻找,其原型对象拥有就调用他.
 * q: 如何查看其原型
 * a: 使用Object.getPrototypeOf()函数s
 * 
 */
const myObject = {
    city :"Beijing",
    greet(){
        console.log(`来自${this.city}的问候`);
    }
}


myObject.greet("河南");
const  yuanxing = Object.getPrototypeOf(myObject)
console.log(myObject)
console.log("查看对象的原型",yuanxing)

/**
 *  创建Date 对象
 *  while 遍历 原型链,并记录输出了原型.
 */
const myDate = new Date(); 
let object = myDate; 
do{
    console.log("开始遍历原型",new Date());
    object = Object.getPrototypeOf(object);
    console.log(object);
}while(object)



    开始遍历原型 2024-10-28T07:18:11.266Z
    {}
    开始遍历原型 2024-10-28T07:18:11.274Z
    [Object: null prototype] {}
    开始遍历原型 2024-10-28T07:18:11.274Z
    null