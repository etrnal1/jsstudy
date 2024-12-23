// 类的修饰符 error lens tsc --init 
class Article {
    public title: string //公开类,继承，外部
    private content: string 
    // 默认可选属性 当前类的内部是默认的

    protected aaa?: string
    constructor(title: string,content: string){
        this.title = title,
        this.content = content
    }
}

const ac = new Article("标题",'内容')
class B extends Article{
    constructor(title,content){
        super(title,content)
        this.title
        console.log(this.title)
    }
    
}

new B("春旭","吹牛")
// 存取器
class User{
    private _password: string=''

    get password(): string{
        return '******'
    }
    set password(newPass: string){
        this._password=newPass
    }
}

// 抽象类 子类的基类，规范格式的
abstract class Animal{
    // 抽象属性

    abstract name: string
    abstract makeSound(): void
    love(){
        console.log("玉龙 爱志鹏")
    }
}
//class User <T>: T{
//   return 'hello'
//}
// 类,继承抽象类
class Cat extends Animal {
    name: string
    makeSound(): void {
        console.log("唱歌") 
    }
}
  
new Cat().makeSound()