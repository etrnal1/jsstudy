/**
 * 这被称为属性的遮蔽
 */
const myDate  = new Date(1995,  4, 5);
console.log(myDate.getYear())

myDate.getYear = function(){
    console.log("我喜欢何云! ");
}
myDate.getYear();