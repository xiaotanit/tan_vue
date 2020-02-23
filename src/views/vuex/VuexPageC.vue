<!-- 测试vuex的module -->
<template>
    <div>
        <div class="vuex-module">
            <button class="btn" @click="addCountA">+</button>
            <span class="num">{{$store.state.moduleCountA.countA}}</span>
            <button class="btn" @click="minusCountA">-</button>
        </div>
        <div class="vuex-module">
            <button class="btn" @click="addCountB">+</button>
            <span class="num">{{$store.state.moduleCountB.countB}}</span>
            <button class="btn" @click="minusCountB">-</button>
        </div>
        <div class="vuex-module">
            <span class="num">{{doubleCountA}}</span>
            <span class="num"> --- </span>
            <span class="num">{{doubleConunB}}</span>
        </div>
        <div class="vuex-module">
            <button class="btn" @click="incrementA">+</button>
            <span class="num">{{$store.state.moduleCountA.countA}}</span>
            <button class="btn" @click="decrementA">-</button>
        </div>
        <div class="vuex-module">
            <button class="btn" @click="incrementB">+</button>
            <span class="num">{{$store.state.moduleCountB.countB}}</span>
            <button class="btn" @click="decrementB">-</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        computed:{
            ...mapGetters({
                doubleCountA: 'moduleCountA/doubleCount',
                doubleConunB: 'moduleCountB/doubleCount'
            })
        },
        methods: {
            ...mapActions({
                //moduleA模块的actions
                addCountA: 'moduleCountA/add',
                minusCountA: 'moduleCountA/minus',
                //moduleB模块的actions
                addCountB: 'moduleCountB/add',
                minusCountB: 'moduleCountB/minus'
            }),
            ...mapMutations({
                //moduleA模块的mutions
                incrementA: 'moduleCountA/increment',
                decrementA: 'moduleCountA/decrement',
                //moduleB模块的mutions
                incrementB: 'moduleCountB/increment',
                decrementB: 'moduleCountB/decrement'
            }),
        }
    }
</script>
<style>
    .vuex-module{
        margin-top: 10px;
    }
    .vuex-module .btn{
        border: 1px solid gray; border-radius: 4px; width: 40px; height: 30px; background: none;
    }
    .vuex-module .num { margin: 0 5px; }
</style>