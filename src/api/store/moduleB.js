const state = {
    countB: 11
}

const mutations = {
    increment(state){
        state.countB++;
    },
    decrement(state){
        state.countB--;
    }
}

//getters类似state里面属性的计算属性
const getters = {
    doubleCount(state){
        return state.countB * 2;
    }
}

const actions = {
    add({ commit }){
        commit('increment')
    },
    minus({ commit }){
        commit('decrement')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}