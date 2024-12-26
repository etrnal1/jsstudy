const maps=  [1,2,3,4,5,6]

mapst=   maps.map((maps)=>maps*3);

console.log(mapst)

// (map)=>map>2 callFunction , (map) element 
const filemaps = maps.filter((map)=>map>2)
console.log(filemaps)
// 当只有一个元素的时候也可以去除掉
const filemapss = maps.filter(map=>map>4)
console.log("map过滤后的数据为: ",filemapss)

const filemapsss = maps.filter((index,map)=>
  
    index %3==2
)
console.log("map过滤后索引后的数据为: ",filemapss)
