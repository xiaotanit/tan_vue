<template>
    <div class="vuex-com-a">
        <div class="title">ComponentB</div>
        <div>localStorage_count: {{localStorage_count}}</div>
        <div>sessionStorage_count: {{sessionStorage_count}}</div>
        <div>vuex_count: {{vuex_count}}</div>
    </div>
</template>

<script>
//    import store from '../../../api/store/index'

    export default {
        data(){
            return {

            }
        },
        computed:{ //计算属性
            vuex_count(){
                return this.$store.state.count;
            },
            localStorage_count(){
                return localStorage.getItem('localStorage_count')
            },
            sessionStorage_count(){
                return sessionStorage.getItem('sessionStorage_count')
            }
        },
        created(){

        },

    }
</script>

<style scoped class="less">
    .vuex-com-a { border: 5px solid blue; color: blue; margin: 5px; padding: 5px; }
    .vuex-com-a .title { font-weight: bold; font-size: 24px; }
</style>