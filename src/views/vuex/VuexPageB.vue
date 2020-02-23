<template>
    <div class="box">
        <p>localStorage、sessionStorage、vuex存储状态表现</p>
        <div>localStorage_count: {{localStorage_count}}</div>
        <div>sessionStorage_count: {{sessionStorage_count}}</div>
        <div>vuex_count: {{vuex_count}}</div>
        <div>vuex_count_alias: {{vuex_count_alias}}</div>
        <div>countPlusLocalState: {{countPlusLocalState}}</div>
        <div class="btn-div-b">
            <button @click="goBack">返回上一页</button>
            <button @click="addCount">点我加1</button>
        </div>
        <div class="btn-div-b">
            <div>state.getters测试</div>
            <div>stateDoneTodsCount: {{stateDoneTodsCount}}, doneTodosCount: {{doneTodosCount}}</div>
            <div v-for="item in stateDoneTods" :key="item.text">{{item.text}}</div>
            <div style="border: 1px dashed black; margin: 10px;">
                <div v-for="item in todoArr" :key="item.text">{{item.text}}</div>
            </div>

            <button class="btn" @click="stateGettersProperty">getters属性调用</button>
            <button class="btn" @click="stateGettersMethod">getters方法调用</button>
            <button class="btn" @click="addTodo">增加数据</button>
            <button class="btn" @click="addStateCount">vuex的count+1</button>
            <button class="btn" @click="incrementAsync">mapActions加1</button>
        </div>

    </div>
</template>

<script>
    //当一个组件需要获取vuex多个状态时, 将这些属性都声称计算属性有些重复和冗余，这时可以使用mapState辅助函数帮助我们生成计算属性
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

    export default {
        data(){
            return {
                localCount: 88
            }
        },
        mounted(){
          console.log("....stror.....")
            console.log(this.$store);

        },
        computed:{
            localStorage_count(){
                return localStorage.getItem('localStorage_count')
            },
            //使用对象展开符"..."，可以将对象目标对象混入到外部对象中
            ...mapState({
                sessionStorage_count(){
                    return sessionStorage.getItem('sessionStorage_count')
                },
                vuex_count: state => state.count, //箭头函数可以使代码更简练
                vuex_count_alias: 'count', //传字符串参数'count'等同于 state => state.count
                // 为了能够使用 `this` 获取局部状态，必须使用常规函数
                countPlusLocalState (state) {
                    return state.count + this.localCount
                }
            }),
            //state.getters调用
            stateDoneTods(){
                return this.$store.getters.doneTodos;
            },
            stateDoneTodsCount(){
                return this.$store.getters.doneTodosCount;
            },
            ...mapGetters({ //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
                doneTodosCount: 'doneTodosCount',
                todoArr: 'doneTodos'
            }),
            /*
            或者写成：
             ...mapGetters([
                'doneTodosCount', 'doneTodos'
             ])
             */
        },
        methods:{
            addCount(){ //加1
                let localStorage_count = localStorage.getItem('localStorage_count');
                if (!localStorage_count) localStorage_count = 0;
                localStorage.setItem('localStorage_count', parseInt(localStorage_count)+1);

                let sessionStorage_count = sessionStorage.getItem('sessionStorage_count');
                if (!sessionStorage_count) sessionStorage_count = 0;
                sessionStorage.setItem('sessionStorage_count', parseInt(sessionStorage_count)+1);

                //在vue跟实例中注册了store选项，这里可以直接通过this.$store调用访问到
                this.$store.commit('increment');
            },
            goBack(){
//                this.$router.back();
                this.$router.go(-1);
            },
            //state.getters调用
            stateGettersProperty(){ //getters属性调用, 属性调用会被缓存
                console.log(this.$store.getters.doneTodos);
                console.log(this.$store.getters.doneTodosCount);
            },
            stateGettersMethod(){ //方法调用,每次都会去进行调用，而不会缓存结果。
                console.log("....start...")
                console.log(this.$store.getters.getTodoById(2).text);
                console.log(this.$store.getters.getTodoById(3).text);
                console.log("....end...")
            },
            addTodo(){ //增加数据
                let count = this.$store.state.todos.length;
                let obj = {
                    id: count + 1,
                    text: (count+1) + '***' + (count+1),
                    done: count % 2
                }
                this.$store.commit('addTodos', obj);



            },

            /*
            mapMutaions将vuex中mutation注入到外部组件中，和mapGetters一样也有两种写法
             ...mapMutations([
                 'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
                 // `mapMutations` 也支持载荷：
                 'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
             ]),
             ...mapMutations({
                add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
             })
            * */
            ...mapMutations({
                addStateCount: 'increment'
            }),
            /*
            在组件中分开actions
             在组件中使用 this.$store.dispatch('xxx') 分发 action，
             或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
             同mapMutations一样也有两种写法
             ...mapActions([
                'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
                // `mapActions` 也支持载荷：
                'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
             ]),
             ...mapActions({
                add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
             })
            * */
            ...mapActions({
                incrementAsync: 'incrementAsync'
            })
        }

    }
</script>

<style>
    .btn-div-b button {
        border: 1px solid black; color: black; margin-right: 10px; background: none; margin: 8px 2px;
        height: 36px;
    }
</style>