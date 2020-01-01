<template>
    <div class="box">
        <h1>佛山 -- 黄飞鸿，from PageC </h1>
        <h3>男儿何不带吴钩，收取关山五十州</h3>
        <h3>路径参数id: {{this.id}}, name: {{this.name}}</h3>
    </div>
</template>

<script>
    export default {
        name: 'pageC',
        props: ['id', 'name'], //直接接收路径参数
        created(){
            console.log("id: ", this.id, ", name: ", this.name)
            console.log(this.$route)
        }
    }
</script>
<style scoped class="less">
    .box{
        border: 5px dashed purple; text-align: center; padding: 10px; color: purple;
    }
</style>