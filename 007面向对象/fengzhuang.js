/**
 * 将 属性 year 属性变为私有的
 * #year 私有数据属性
 * 在类的外部使用year就会报错
 */

class Student {
    #year ='2024'
    /**
     * 只能在内部访问私有方法,外部访问报错
     */
    #somePrivateMethod(){
        console.log("You called me?")
    }
      
    
}
console.log("封装私有属性,只有内部使用,外部访问报错")
const summer =  new Student("summer")
console.log(Student.year)

console.log(summer.year)