const state = {
    countA: 99
}

const mutations = {
    increment(state){
        state.countA++
    },
    decrement(state){
        state.countA--
    }
}

const getters = {
    doubleCount(state){
        return state.countA * 2
    }
}

const actions = {
    add({ commit }){
        setTimeout(function(){
            commit('increment')
        }, 50)
    },
    minus({ commit }){
        setTimeout(()=>{
            commit('decrement')
        }, 500)
    }
}

export default {
    namespaced: true, //表示设置命名空间
    state,
    mutations,
    getters,
    actions
}