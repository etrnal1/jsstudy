/** 
 * 对象 Objects 是属性的容器，每个属性都有名字和值,
 * 属性是包含空字符串之外的任意字符串，属性值除undefined值
 *之外的任何值
 * class 类 类内函数不加function  */
class a {

    f_get(){
        console.log("何处不相逢,云")
    }
}

var l = new a() 
l.f_get()

var t = {
    "first-name":"Jerome",
    "last-name":"Howard",
    fruit:"apple",
    "first":"hello"
}
/**
 *  检索对象包含的值 [] 包括住一个字符串
 *  - 线不合法,但_ 线可以使用
 *  . 更简洁,可读性更好
 */
console.log(typeof(t))
console.log(t["first-name"])
console.log(t.fruit)
console.log(t["first"])
/**
 * 每个对象都链接到一个原型对象,Object.prototype
 */
{}容器
{}.fight = {} 填充内容