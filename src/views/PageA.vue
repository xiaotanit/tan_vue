<template>
    <div class="box">
        <h1>九华山 -- 李慕白, from PageA </h1>
        <h3>咬定青山不放松，立根原在破岩中</h3>
        <h3>{{paramsStr}}</h3>
        <h3>{{queryStr}}</h3>
    </div>
</template>

<script>
    export default {
        name: 'pageA',
        data(){
            return {
                paramsStr: '', //动态路径参数字符串
                queryStr: '', //查询参数
            }
        },
        created(){
            let params = this.$route.params; //获取路径参数
            let str = '路径参数：', str2 = '查询参数：';
            for (let key in params){
                str += ` ${key}=${params[key]} &`;
            }
            this.paramsStr = str.substring(0, str.length-1);

            let query = this.$route.query;
            for (let key in query){
                str2 += ` ${key}=${query[key]} &`;
            }
            this.queryStr = str2.substring(0, str2.length-1);

            console.log('this.$route: ');
            console.log(this.$route);
        }
    }
</script>

<style scoped class="less">
    .box{
        border: 5px dashed blue; color: blue; padding: 10px;
    }
</style>