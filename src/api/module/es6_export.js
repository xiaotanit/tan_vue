console.log(".....ES6 Module...导出start...")
let count = 0;

// //第一种导出方式：命名导出
// //1.1 命名导出第一种写法
// export const name = 'es6_export.js';
// export count = count;
// export const add = function(a, b) {
//     count+=1;
//     return a + b;
// }


//1.2 命名导出第二种写法
const name = 'es6_export.js'
const add = function(a, b){
    count += 1;
    return a + b;
}
export { name, add, count };
//// export { name, add as getSum, count }; //在导入时即为name和getSum


//第二种导出方式：默认导出
export default{
    name: 'es6_export.js',
    count: count,
    add: function(a, b){
        count+=1;
        return a + b;
    }
}


/*
ES6 Module : 2015年6月，ES6中才有模块这一特性
1、es6的export有两种方式：1、命名导出；   2、默认导出
1.1、命名导出，一个模块可以有多个命名导出。它有两种不同的写法
   //写法1, 将变量的声明和导出写在一行
   export const name =  'calculator';
   export const add = function(a, b){ return a + b; }

   //写法2， 先进行变量声明，然后再用同一个export语句导出。两种写法的效果一样
   //在使用命名导出时，可以通过as关键字对变量重命名，如export { name, add as getSum }
   const name = 'calculator';
   const add = function(a, b){ return a + b; }
   export { name, add };

 1.2、默认导出: 与命名导出不同，模块的默认导出只能有一个。如下面的代码
 我们可以将export default理解为对外输出了一个名为default的变量，因此不需要像命名导出一样进行变量声明，直接导出只即可。
 //导出字符串
 export default 'this is es6_export.js file '
 //导出class
 export default class {...}
 //导出匿名函数
 export default function(){ ... }

 - - - - - - - - - - - - - - - - - - - - - - - - - -
 2、导入，加载带有命名导出的模块时，import后面要跟一对大括号来将导入的变量名包裹起来，并且这些变量名需要与导出的变量名完成一致。
 导入变量的效果相当于在当前作用域下声明了这些变量，并且布可对其进行更改，也就是所有导入的变量都是只读的。

 2.1 与命名导出类相似，我们可以通过as关键字对导入的变量重命名。如：
 import {name, add as calculatorSum} from './commonJS_exports.js';

 2.2 在导入多个变量时，我们还可以采用整体导入的方式。如：
 import * as calculator from './commonJS_exports.js';
 console.log(calculator.add(2, 3));
 console.log(calculator.name);
 使用import * as <myModule>可以把所有导入的变量作为属性添加到<myModule>对象中，从而减少了对当前作用域的影响。


 2.3 接下来处理默认导出，请看下面这个列子
 export default {
    name: 'calculator',
    add: function(a, b) { return a + b; }
 }

 //PageModule.vue
 import myCalculator from './commonJS_exports.js';
 myCalculator.add(2, 3);
    对于默认导出来说，import后面直接跟变量名，并且这个名字可以自由指定（比如这里时myCalculator）,它指代了calculator.js中默认导出的值。
    从原理上可以这样去理解：
    import { default as myCalculator } from './commonJS_exports.js';

 2.4 两种导入方式混合起来的例子：
  //PageModule.vue
  import React, { Component } from 'rect';
  这里的React对应的时该模块的默认导出，而Component则是其命名导出中的一个变量
  注意，这里的React必须写在大括号前面，而不能顺序颠倒，否则会提示语法错误。

2.5 复合写法， 在工程中，有时需要把某一个模块导入后立即导出，比如专门用来集合所有页面或组件的入口文件。此时可以采用复合形式的写法：
export { name, add } from './commonJS_exports.js';
复合写法目前只支持当被导入模块（这里的calculator.js）通过命名导出的方式暴露出来的变量，默认导出则没有对应的复合形式，只能将导入和导出拆开写。
import calculator from './commonJS_exports.js'; //导出默认命名
export default calculator;  //马上导出

3、CommonJS与ES6 Module的区别
   上面我们分别介绍了CommonJS和ES6 Module两种形式的模块定义，在实际开发过程中我们经常会将二者混用，因此这里有必要对比一下它们各自的特性。
   3.1  动态和静态
    CommonJS和ES6 Module最本质的区别在于前者对模块依赖的解决是“动态的”，而后者是“静态的”。这里“动态”的含义是, 模块依赖关系的建立发生在代码运行阶段；
    而“静态”则是模块依赖关系的建立发生在代码编译阶段。
    让我们先看一个CommonJS的例子：
    //commonJS_exports.js
    module.exports = {name: 'commonJS_exports.js' };
    //PageModule.vue
    const name = require('../api/module/commonJS_exports.js').name;
    在上面介绍CommonJS的部分时我们提到过，当模块A加载模块B时（在上面的例子中时PageModule.vue加载calculator.js）,会执行B中的代码，
    并将其module.exports对象作为require函数的返回值返回。并且require的模块路径可以动态指定，支持传入一个表达式，
    我们甚至可以通过if语句判断是否加载某个模块。因此，在CommonJS模块被执行前，并没有办法确定明确的依赖关系，模块的导入、导出发生在代码的运行阶段。

    同样的例子，我们再对比看下ES6 Module的写法
    //es6_export.js
    export const name = 'es6_export.js';
    //PageModule.vue
    import { name } from '../api/module/es6_export.js';
    ES6 Module的导入、导出语句都是声明式，它不支持导入的路径是一个表达式，并且导入、导出语句必须位于模块的顶层作用域（比如不能放在if语句中）。
    因此我们说，ES6 Module是一种静态的模块结构，在ES6代码的编译阶段就可以分析出模块的依赖关系。它相比于CommonJS来说具备以下几点优势：
    3.1.1 冗余代码检测和排除。我们可以用静态分析工具分析工具检测出哪些模块没有被调用过。比如，在引入工具类库时，工程中往往只用到了其中一部分组件或接口，
    但有可能会将其代码完整地加载进来。未被调用到的模块代码永远不会被执行，也就成为了冗余代码。通过静态分析可以在打包时去掉这些未曾使用过的模块，以减少打包资源体积。
    3.1.2 模块变量类型检查。JavaScript属于动态类型语言，不会在代码执行前检查类型错误（比如对一个字符串类型的值进行函数调用）。
    ES6 Module的静态模块结构有助于确保模块之间传递的值或接口类型时正确的。
    3.1.3 编译器优化。在CommonJS等动态模块系统中，无论采用哪种方式，本质上导入的哦都是一个对象，而ES6 Module支持直接导入变量，减少了引用层级，程序效率更高。

    3.2 值拷贝和动态映射
    在导入一个模块时，对于CommonJS来说获取的是一份导出值的拷贝；而在ES6 Module中则是值的动态映射，并且这个映射是只读的。例子：
    //commonJS_exports.js
    var count = 0;
    module.exports = {
        count: count,
        add: function(a, b){
            count+=1;
            return a + b;
        }
    }

    //PageModule.vue
    var count = require('../api/module/commonJS_exports.js').count;
    var add = require('../api/module/commonJS_exports.js').add;
    console.log(count); //0 这里的count是对commonJS_exports.js中count值的拷贝
    add(2, 3);
    console.log(count); //0 commonJS_exports.js中变量值的改变不会对这里的拷贝值造成影响
    count += 1;
    console.log(count); //1 拷贝的值可以更改
    PageModule.vue中的count是对commonJS_exports.js中count的一份值拷贝，因此在调用函数时，虽然更改了原本calculator.js中count的值，
    但是并不会对PageModule.vue中导入时创建的副本造成影响。
    另一方面，在CommonJS中允许对导入的值进行更改。我们可以在PageModule.vue更改count和add, 将其赋予新值。同样，由于是值的拷贝，这些操作不会影响calculator.js本身。

    下面我们使用ES6 Module将上面的例子进行改写：
    //es6_export.js
    let count = 0;
    const add = function(a, b){
        count += 1;
        return a + b;
    }
    export { count, add }

    //PageModule.vue
    import {name, add, count } from '../api/module/es6_export.js';
    console.log(count); //0, 对es6_export.js中的count值的映射
    add(2, 3);
    console.log(count); //1 实时反映es6_export.js中count值的变化
    //count += 1; //不可更改，会抛出SyntaxError: "count" is read-only

    上面的例子展示了ES6 Module中导入的变量其实是对原有值的动态映射。PageModule.vue中的count是对es6_export.js中的count值的实时反映，
    当我们通过调用add函数更改了calculator.js中的count值时，PageModule.vue中count的值也随之变化。
        我们不可以对ES6 Module导入的变量进行更改，可以将这种映射关系理解为一面镜子，从镜子里我们可以实时观察到原有的事物，但是并不可以操作镜子中的影像。

    3.3 循环依赖
    循环依赖是指模块A依赖于B, 同时模块B依赖于模块A。比如下面的这个例子
    //foo.js
    import { foo } from './bar.js';
    foo();

    //bar.js
    import { bar } from './foo.js';
    bar();

    一般来说工程中应该尽量避免循环依赖的产生，因为从软件设计的角度来说，单向的依赖关系更加清晰，而循环依赖则会带来一定的复杂度。
    而在实际开发中，循环依赖有时会在我们不经意间产生，因为当工程的复杂度上升到足够规模时，就容易出现隐藏的循环依赖关系。
        简单来说，A和B两个模块之间是否存在直接的循环依赖关系是很容易被发现的。但实际情况往往是A依赖于B，B依赖于C，C依赖于D，最后绕了一圈，D又依赖于A。
        当中间模块太多时就很难发现A和B之间存在着隐式的循环依赖。
     因此，如何处理循环依赖是开发者必须要面对的问题。我们首先看下在CommonJS中循环依赖的例子：
     //foo.js
     const bar = require('./bar.js');
     console.log('value of bar: ', bar);
     module.exports = 'This is foo.js';

     //bar.js
     const foo = require('./foo.js');
     console.log('value of foo: ', foo);
     module.exports = 'This is bar.js';

     //PageModule.vue
     require('./foo.js');
     在这里，PageModule.vue是执行入口，它加载了foo.js, foojs和bar.js之间存在循环依赖。让我们观察foo.js和bar.js中的代码，理想状态下我们希望二者都能导入正确的值，并在控制台上输出。
     value of foo: This is foo.js
     value of bar: This is bar.js
     而当我们运行上面的代码时，实际输出却是：
     value of foo: {}
     value of bar: This is bar.js
     为什么foo的值会是一个空对象呢？让我们从头梳理一下代码的实际执行顺序。
     1)、PageModule.vue导入了foo.js， 此时开始执行foo.js中的代码
     2)、foo.js的第1句导入了bar.js， 这时foo.js不会继续向下执行，而是进入了bar.js内部。
     3)、在bar.js中又对foo.js进行了require, 这里产生了循环依赖。需要注意的是，执行权并不会在交回foo.js，而是直接俄取其导出值，也即是module.exports。
     但由于foo.js未执行完毕，导出值在这时为默认的空对象，因此当bar.js执行到打印语句时，我们看到控制台中的value of foo就是一个空对象。
     4)、bar.js执行完毕，将执行权交回foo.js
     5)、foo.js从require语句继续向下执行，在控制台打印出value of bar(这个值时正确的)，整个流程结束。

     从上面可以看出，尽管循环依赖的模块均被执行了，但模块导入的值并不是我们想要的。因此在CommonJS中，若遇到循环依赖我们没有办法得到预想中的结果。

     我们再从webpack的实现角度来看，将上面的例子打包后，bundle中有这样一段代码非常重要：
     //The require function
     function __webpack_require__(moduleId){
        if(installedModules[moduleId]){
            return installedModules[moduleId].exports;
        }
        //Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            1: false,
            exports: {}
        }
        //...
     }
     当PageModule.vue引用了foo.js之后，相当于执行了这个__webpack_require__函数，初始化了一个module对象并放入installModules中。
     当bar.js再次引用foo.js时， 又执行了该函数，但这次时直接从installedModules里面取值，此时它的module.exports是一个空对象。
     这就解释了上面在第三步看到的现象。
     接下来让我们使用ES6 Module的方式重写上面的例子。
     //foo_es6.js
    import bar from './bar_es6.js';
    console.log('value of bar: ', bar);
    export default 'This is foo_es6.js';

     //bar_es6.js
    import foo from './foo_es6.js';
    console.log('value of foo: ', foo);
    export default 'This is bar_es6.js';

     //PageModule.vue
    import foo_es6 from '../api/module/foo_es6.js';
    打印结果：
    value of foo:  undefined
    value of bar:  This is bar_es6.js

     很遗憾，bar_es6.js中同样无法得到foo_es6.js正确的导出值，只不过和CommonJS默认导出一个空对象不同，这里获取到的是undefined。
     上面我们谈到，在导入一个模块时，CommonJS获取到的是值的拷贝，ES6 Module则是动态映射，
     那么我们能否利用ES6 Module的特性支持循环依赖呢？请看下面这个例子：

     //PageModule.vue
     import foo_es6_2 from '../api/module/foo_es6_2.js'
    foo_es6_2('PageModule.vue');

     //bar_es6_2.js
    import foo from './foo_es6_2.js';
    let invoked = false;
    function bar(invoker){
        if (!invoked){
            invoked = true;
            console.log(invoker + ' invokes bar_es6_2.js');
            foo('bar_es6_2.js');
        }
    }
    export default bar;

     //foo_es6_2.js
    import bar from './bar_es6_2.js'
    function foo(invoker){
        console.log(invoker + ' invokes foo_es6_2.js');
        bar('foo_es6_2.js');
    }
    export default foo;

     上面代码的执行结果如下：
     PageModule.vue invokes foo_es6_2.js
    foo_es6_2.js invokes bar_es6_2.js
    bar_es6_2.js invokes foo_es6_2.js

    可以看到，foo_es6_2.js和bar_es6_2.js这一对循环依赖的模块均获取到了正确的导出值。下面我们分析一下代码的执行过程：

    1)、PageModule.vue作为入口导入了foo_es6_2.js，此时开始执行foo_es6_2.js中的代码。
    2)、从foo_es6_2.js导入bar_es6_2.js，执行权交给了bar_es6_2.js。
    3)、在bar_es6_2.js中一直执行到其结束，完成bar函数的定义。注意，此时由于foo_es6_2.js还没执行完，foo的值现在仍然时undefined。
    4)、执行权回到foo_es6_2.js继续 执行直到其结束，完成foo函数的定义。由于ES6 Module动态映射的特性，此时在bar_es6_2.js中的foo的值已经从undefined成为了我们定义的函数，这是于CommonJS在解决循环依赖时的本质区别，CommonJS中导入的是值得拷贝，不会随着被夹在模块中原有值的变化而变化。
    5)、执行权回到PageModule.vue并调用foo函数，此时会依次执行foo-->bar-->foo，并在控制台打印出正确的值。

    由上面的例子可以看出，ES6  Module的特性使其可以更好的支持循环依赖，只是需要由开发者来保证导入的值被使用时已经设置好正确的导出值。


    //模块打包的原理
    //立即执行匿名函数
    (function(modules){
        //模块缓存
        var installedModules = {};
        //实现require
        function __webpack_require__(moduleId){
            //...
        }
        //执行入口模块的加载
        return __webpack_require__(__webpack__require__.s == 0);
    })({
        //modules: 以key-value的形式存储所有被打包的模块
        0: function(module, exports, __webpack_require__){
            //打包入口
            module.exports = __webpack_require__("3qiv");
        },
        "3qiv": function(module, exports, __webpack_require__){
            //PageModule.vue 内容
        },
        jkzz: function(module, exports){
            //commonJS_exports.js 内容
        }
    })
    这是一个最简单的Webpack打包结果(bundle)，但已经可以清晰地展示出它是如何将具有依赖关系的模块串联在一起的。上面的bundle分为以下几个部分：

    . 最外层立即执行匿名函数。它用来包裹整个bundle，并构成自身的作用域。
    . installedModules对象。每个模块只在第一次被加载的时候执行，之后其导出值就被存储到这个对象里面，当再次被加载的时候直接从这里取值，而不会重新执行。
    . __webpack_require__函数。对模块加载的实现，在浏览器中可以通过调用__webpack_require__(moduleId)来完成模块导入。
    . modules对象。工程中所有产生了依赖关系的模块都会以key-value的形式放在这里。key可以理解为一个模块的id， 由数字或者一个很短的hash字符串构成；value则是由一个匿名函数包裹的模块实体，匿名函数的参数则赋予了每个模块导出和导入的能力。

    接下来我们看看一个bundle是如何在浏览器中执行的：
    1)、在最外层的匿名函数中会初始化浏览器执行环境，包括定义installedModules对象、__webpack_require__函数等，为模块的加载和执行做一些准备工作。
    2)、加载入口模块。每个bundle都有且只有一个入口模块，在上面的示例中，PageModule.vue是入口模块，在浏览器中会从它开始执行。
    3)、执行模块代码。如果执行到了module.exports则记录下模块的导出值；如果中间遇到require函数(准确地说是__webpack_require__)，则会暂时交出执行权，进入__webpack_require__函数体内进行加载其他模块的逻辑。
    4)、在__webpack_require__中会判断即将加载的模块是否存在于installedModules中。如果存在则直接取值，否则回到第3步，执行该模块的代码来获取导出值。
    5)、所有依赖的模块都已执行完毕，最后执行权又回到入口模块。当入口模块的代码执行到结尾，也就意味着整个bundle运行结束。

    不难看出，第3步和第4步时一个递归的过程，Webpack为每个模块创造了一个可以导出和导入模块的环境，但本质上并没有修改代码的执行逻辑，因此代码执行的顺序于模块加载的顺序时完全一致的，这就时Webpack模块打包的奥秘。
 */

