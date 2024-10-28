const myDate = new Date();
let object = myDate;


do {

// 让其指向当前对象的原型 
  object = Object.getPrototypeOf(object);
//   const properties = Object.getOwnPropertyNames(object);
    console.log(object)
//   console.log(properties);
} while (object);