    // 定义私有属性,只有在类内部使用
 

    class Animal {
        #height = 0; 
        #width 
        // 构造方法
        constructor(name){
            this.name = name;
        }
        // 定义方法,使用了模版字符串``
        speak(){
            console.log(`${this.name} 讲话了`);
        }
    }

    let t = new Animal('大象')
    t.speak()
    // Dog 类继承Animal 所有方法
    class Dog  extends Animal{

    }

    let d= new Dog("小狗")
    console.log(d.speak())