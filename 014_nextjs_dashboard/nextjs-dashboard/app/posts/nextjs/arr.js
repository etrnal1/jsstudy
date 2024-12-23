// 数组和数字方法
//描述
// 在 JavaScript 中，数组不是原始类型，而是具有以下核心特征的 Array 对象：

// JavaScript 数组是可调整大小的，并且可以包含不同的数据类型。（当不需要这些特征时，可以使用类型化数组。）
// JavaScript 数组不是关联数组，因此，不能使用任意字符串作为索引访问数组元素，但必须使用非负整数（或它们各自的字符串形式）作为索引访问。
// JavaScript 数组的索引从 0 开始：数组的第一个元素在索引 0 处，第二个在索引 1 处，以此类推，最后一个元素是数组的 length 属性减去 1 的值。
// JavaScript 数组复制操作创建浅拷贝。（所有 JavaScript 对象的标准内置复制操作都会创建浅拷贝，而不是深拷贝）。

const colors= ["红","黄","蓝"]
colors[5] ="紫"
colors.forEach((item,index)=>{
    console.log(`${index}: ${item}`)
})

console.log(colors.reverse());