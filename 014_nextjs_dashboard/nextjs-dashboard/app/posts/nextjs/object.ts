// 对象
// 在 JavaScript 中，几乎所有的对象都是 Object 的实例；一个典型的对象从 Object.prototype 继承属性（包括方法），尽管这些属性可能被覆盖（或者说重写）。唯一不从 Object.prototype 继承的对象是那些 null 原型对象，或者是从其他 null 原型对象继承而来的对象。

// 通过原型链，所有对象都能观察到 Object.prototype 对象的改变，除非这些改变所涉及的属性和方法沿着原型链被进一步重写。尽管有潜在的危险，但这为覆盖或扩展对象的行为提供了一个非常强大的机制。为了使其更加安全，Object.prototype 是核心 JavaScript 语言中唯一具有不可变原型的对象——Object.prototype 的原型始终为 null 且不可更改。