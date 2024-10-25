/**
 * 
 * @param {*} a 参数1 num 
 * @param {*} b 参数2 number 
 * @returns 返回a+b 之和
 */
var add =function(a,b){

    return a+b; 


    
}

console.log(add(1,23))


// 测试对象

var myObje = {
    value: 0 ,
    getComputedStyle(){
        console.log("使用this访问value",this.value)

    }
}
myObje.getComputedStyle();