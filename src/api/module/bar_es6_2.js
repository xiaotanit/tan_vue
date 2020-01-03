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