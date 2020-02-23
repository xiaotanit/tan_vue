/*
*  当项目大了后，为了责任清晰，目标明确，更易管理，将store拆成多个module形式
* */
import moduleCountA from './moduleA'
import moduleCountB from './moduleB'
import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)

export default new vuex.Store({
    modules: {
        moduleCountA,
        moduleCountB
    }
})
