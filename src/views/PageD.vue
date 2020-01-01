<template>
    <div class="box">
        <h1>飞将军 -- 李广，from PageD </h1>
        <h3>秦时明月汉时关，万里长征人未还</h3>
    </div>
</template>

<script>
    export default {
        name: 'pageD',
        created(){
            console.log(this.$route)
        }
    }
</script>
<style scoped class="less">
    .box{
        border: 5px dashed yellow; text-align: center; padding: 10px; color: yellow; background-color: #000000;
    }
</style>