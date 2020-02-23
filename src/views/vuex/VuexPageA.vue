<template>
    <div class="box">
        <p>localStorage、sessionStorage、vuex存储状态表现</p>
        <div>
            <vuex-com-a></vuex-com-a>
            <vuex-com-b></vuex-com-b>
            <vuex-com-c></vuex-com-c>
        </div>
        <div class="btn-div">
            <button @click="addCount" class="add-btn">点我加1</button>
        </div>
        <router-link to="/vuexPageB">下一页</router-link>
    </div>
</template>

<script>
//    import store from '../../api/store/index'
    import VuexComA from './components/VuexComA.vue'
    import VuexComB from './components/VuexComB.vue'
    import VuexComC from './components/VuexComC.vue'

    export default {
        data(){
            return {

            }
        },
        components: {
            VuexComA, VuexComB, VuexComC
        },

        created(){

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
        }

    }
</script>

<style>
    .btn-div .add-btn {
        margin: 10px; border: 1px solid gray; background: none; border-raidus: 4px;
        width: 120px; height: 36px; color: red; font-size: 22px;
    }
</style>