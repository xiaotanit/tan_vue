<template>
    <div class="box">
        <button @click="testCommonJS">CommonJS导入测试</button>
        <button @click="testES6Module">ES6 Module导入测试</button>
        <button @click="testCommonJSCopyValue">CommonJS值拷贝测试</button>
        <button @click="testES6ModuleValueMap">ES6 Module值动态映射测试</button>
        <button @click="testCommonJSCycle">CommonJS循环依赖演示</button>
    </div>
</template>

<script>
    //演示ES6 Module的export 和 import
   // import {name, add, count } from '../api/module/es6_export.js'; //命名导入第一种导出方式, 后缀.js可加可不加
//    import * as esObj from '../api/module/es6_export'; //命名导入第二种别名导出方式
//    import {name, add as getSum, count } from '../api/module/es6_export'; //命名导入第三种别名导出方式

    /*对于默认导出的导入，import后面直接跟变量名，这个名字可以自由指定，
    它指代了es6_export.js中默认导出的值。从原理上可以这样去理解：
    import { default as esObj } from '../api/module/es6_export';
    注意和命名导出别名的区别，命名导出设置别名时必须  * as 别名 ；而默认导出import后面直接跟自定义变量名，不需要 * as
    */
    // import esObj from '../api/module/es6_export.js';
    //混合导入(即导出的既有命名导出，又有默认导出)，注意：混合导入时，默认导入要写在前面，不然会报错
    import esObj, {name, add, count } from '../api/module/es6_export.js';

    /* 复合写法： export {name, add} from '../api/module/es6_export.js'
        复合写法目前只支持 "命名导出"方式暴露出来的变量。
        默认导出没有对应的复合形式，只能将导入和导出拆开写
        import esObj from  '../api/module/es6_export.js'
        export default esObj
    * */


    //ES6 Module 循环依赖错误的测试
    console.log('\n\n')
    //PageModule.vue
    import foo_es6 from '../api/module/foo_es6.js';
    console.log(foo_es6)
    /* 打印结果：
    value of foo:  undefined
    value of bar:  This is bar_es6.js
    * */

    //ES6 Module 循环依赖正确的测试
    console.log('\n\n')
    import foo_es6_2 from '../api/module/foo_es6_2.js'
    foo_es6_2('PageModule.vue');
    /* 打印结果：
    PageModule.vue invokes foo_es6_2.js
    foo_es6_2.js invokes bar_es6_2.js
    bar_es6_2.js invokes foo_es6_2.js
    * */

    export default {
        name: 'pageModule',
        created(){
            console.log("\n\n^^^^^^^^^^^pageD 页面^^^^^^^^^^^^")
        },
        methods:{
            //CommonJS测试
            testCommonJS(){
                console.log("....test CommonJS 的导入...")
                //1、测试CommonJS的exports和require
                var comObj = require('../api/module/commonJS_exports');
                //再调用一次导入，发现导入模块不会再次执行，而是直接导出上次执行后得到的结果
                var name2 = require('../api/module/commonJS_exports').name;

                console.log('...name: ', comObj.name, ', name2: ', name2);
                try{
                    console.log('8 + 9 = ', comObj.add(8, 9));
                }catch(e){
                    console.log(e);
                }
            },
            testES6Module(){
                console.log("\n\n....test es6_module import start...")

               //命名导出第一种导入方式
               console.log('name: ', name);
               console.log('12 + 21: ', add(12, 21));

//                //命名导出第二种别名导入方式
//                console.log('name: ', esObj.name);
//                console.log('12 + 21: ', esObj.add(12, 21));

//                //命名导出第三种别名导入方式
//                console.log('name: ', name);
//                console.log('12 + 21: ', getSum(12, 21));

                //默认命名导出的导入测试
                console.log('默认导入name: ', esObj.name);
                console.log('默认导入12 + 21: ', esObj.add(12, 21));
            },
            //CommonJS值拷贝测试
            testCommonJSCopyValue(){
                console.log("\n\n...CommonJS 值拷贝 test ...")
                var count = require('../api/module/commonJS_exports.js').count;
                var add = require('../api/module/commonJS_exports.js').add;
                console.log(count); //0 这里的count是对commonJS_exports.js中count值的拷贝
                add(2, 3);
                console.log(count); //0 commonJS_exports.js中变量值的改变不会对这里的拷贝值造成影响
                count += 1;
                console.log(count); //1 拷贝的值可以更改
            },
            //ES6 Module 值动态映射测试
            testES6ModuleValueMap(){
                console.log(count); //0, 对es6_export.js中的count值的映射
                add(2, 3);
                console.log(count); //1 实时反映es6_export.js中count值的变化
                // count += 1; //不可更改，会抛出ReferenceError: count is not defined
            },
            //CommonJS循环依赖演示
            testCommonJSCycle(){
                require('../api/module/foo.js');
                /*
                打印结果：
                value of foo:  {}
                value of bar:  This is bar.js
                * */
            },
        }
    }
</script>
<style scoped class="less">
    .box{
        border: 5px dashed gray; text-align: center; padding: 10px;
    }
    .box button {
        height: 36px; margin: 10px; background: none; border-radius: 4px; outline: none; border: 1px solid black; color: black;
    }
    .box button::after { border: 1px solid black; }
</style>