// 接口演示
interface Parent{
    prop1:  string 
    prop2:  number
}

interface Child extends Parent{
    prop3: string
}

const myObj: Child={
    prop1: '',
    prop2:  2,
    prop3: ''
}

console.log(myObj)