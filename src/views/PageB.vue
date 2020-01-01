<template>
    <div class="box">
        <h1>一片云 -- 罗小虎，from PageB </h1>
        <h3>千磨万击还坚劲，任尔东南西北风</h3>
        <!-- 嵌套路由，嵌套页面占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'pageB',
        created(){
            console.log('...pageB...')
            console.log(this.$route)
        }

    }
</script>
<style scoped class="less">
    .box{
        border: 5px dashed gray; text-align: center; padding: 10px;
    }
</style>