// 解构出来是undefined 才会生效,
// null,false,0,Nan 不会生锈
const [a = 2] = [];  //解构数组是null,没有元素,a为undefined,默认值1生效
console.log("打印A: ",a)
// 非undefined 都不生效，只有undefined 才会生效;
const {b=2} = {b:null} 
console.log(b)

// 交换变量
let ac = 1;
let bc = 3;

[ac,bc]=[bc,ac];
console.log("交换下变量bc应为3:  ",ac);

// 解析从一个函数返回的数组

function f(){
    return [1,2,3];
}

// 忽略部分值
const [as,, bs]=f(); 
console.log(as,bs);
// 忽略全部返回值;
[, ,] =f(); 
const [acs,bcs,...{pop,push}] = [1,2]; 


console.log(pop,push)
