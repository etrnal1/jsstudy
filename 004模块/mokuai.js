/**使用函数和闭包构成一个模块 */
/* 模块提供接口却隐藏状态与实现的函数或对象，*/

/*01 string deetinfy 全局变量*/
// string 对象的
String.prototype.deen= function() {
    const entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    return function() {
        return this.replace(/&([^&;]+);/g, (match, name) => 
            typeof entity[name] === 'string' ? entity[name] : match
        );
    };
}();
const str = '&quot;Hello&lt;world&gt;&quot;';
console.log(str.deen());  // 输出: '"Hello<world>"'

String.prototype.cs=function(){
    let str = this.valueOf(); //捕获原始字符串
    return function(){
       console.log("字符串内容: ",str)
    }
}

let  a = "123"
a.cs()()