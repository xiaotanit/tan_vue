//foo_es6_2.js
import bar from './bar_es6_2.js'
function foo(invoker){
    console.log(invoker + ' invokes foo_es6_2.js');
    bar('foo_es6_2.js');
}
export default foo;