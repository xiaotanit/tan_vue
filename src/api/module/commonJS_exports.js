console.log('...hello, 我是commonJS_exports.js....start..')
var count = 0;

//1、第一种写法
module.exports = {
    name: 'commonJS_exports.js',
    count: count,
    add: function(a, b){
        count+=1;
        return a + b;
    }
}

/*
    2、第二种写法
    CommonJS也支持另一种简写方式，直接使用exports, 效果和上面一样
* */
// exports.name = 'commonJS_exports.js';
// exports.count = count;
// exports.add = function(a, b){
//     count+=1;
//     return a + b;
// }


//3、导出时不要把module.exports 和 exports 混用，容易出现问题，下面举一个错误的示例
// exports.add = function(a, b){
//     return a + b;
// }
// module.exports = {
//     name: 'commonJS_exports.js'
// }
/* 上面的代码先通过exports导出了add属性，然后将module.exports重新赋值为另一个对象，
这会导致原本拥有add属性的对象丢失了，最后导出的只有name.
* */