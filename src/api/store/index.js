import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        todos: [
            { id: 1, text: '金戈铁马，气吞万里如虎', done: true },
            { id: 2, text: '老骥伏枥，志在千里', done: false },
            { id: 3, text: '周公吐哺，天下归心', done: true },
            { id: 4, text: '但使龙城飞将在，不教胡马度阴山', done: false },
        ]
    },
    mutations: {
        increment (state) {
            state.count++
        },
        addTodos (state, todo){
            console.log("...addTods...: ", todo);
            if (todo){
                state.todos.push(todo);
            }
        }
    },
    //Vuex允许我们再store中定义"getter"（可以认为是store的计算属性）。
    // 就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    getters: {
        doneTodos: state => {
            console.log('...state.getters.donwTodos...')
            return state.todos.filter(todo => todo.done)
        },
        //Getter也可以接受其他getter作为第二个参数
        //getter在通过属性访问时是作为Vue的响应式系统的一部分缓存其中的
        doneTodosCount: (state, getters) => {
            console.log('...state.getters.doneTodosLength...', getters.doneTodos)
            return getters.doneTodos.length;
        },
        //通过方法访问：通过让getter返回一个函数，来实现给getter传参。
        //getter在通过方法访问时，每次都会去进行调用，而不会缓存结果。
        getTodoById: (state) => (id) => {
            console.log('...state.getters.getTodoById...: ', id);
            return state.todos.find(todo => todo.id === id);
        }
    },
    /*
     Action 类似于 mutation，不同在于：
     Action 提交的是 mutation，而不是直接变更状态。
     Action 可以包含任意异步操作。

     //Actions 支持同样的载荷方式和对象方式进行分发：
     // 以载荷形式分发
     store.dispatch('incrementAsync', {
        amount: 10
     })
     // 以对象形式分发
     store.dispatch({
         type: 'incrementAsync',
         amount: 10
     })
     */
    actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        //Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？
        //首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，
        // 并且 store.dispatch 仍旧返回 Promise：
        actionA ({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('increment')
                    resolve()
                }, 1000)
            })
        },
        actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
                commit('increment')
            })
        },
        //如果我们利用 async / await，我们可以如下组合 action：
        // async actionC ({ commit }) {
        //     // commit('gotData', await getData())
        // },
        // async actionD ({ dispatch, commit }) {
        //     await dispatch('actionC') // 等待 actionC 完成
        //     // commit('gotOtherData', await getOtherData())
        // }
    }
})
