var t= function(){
    var s = 123
    console.log(s)
    s++;
    console.log(s)

}


t();

let biBao = document.querySelector('.box').addEventListener('click',()=>{test()})
function test(){
    let st = 1 //函数内部使用
    // 通过闭包的方式访问st
    console.log("点击了测试按钮",Date())
    return function(){ // 闭包函数能记住状态
        st ++;
        return st;
    }
}

const ta = test();
console.log(ta());
console.log(ta());
console.log(ta());
console.log(ta());
