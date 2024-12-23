// 箭头函数

const marrys: [string,string,string] = ['Hy','py','Jd'];

console.log("打印数字长度",marrys.map(ma=>(ma.length)));

// 传统匿名函数
(function(a){
    return a+100; 
});

(b)=>{
    return b+100; 
};

(a)=>a+10   //return 返回值是隐含的

a=>a+100 //移除参数外地括号

// 只指定一个语法，隐式返回值,块语法，必须使用显示的return 

const func =(x)=>x*x  
const fun2=(x,y)=>{
    return x+y
}
