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
        // name: 'pageA',
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
        },
        //组件内的守卫
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            console.log('...组件内守卫beforeRouteEnter...')
            console.log(to)
            console.log(from)

            //beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
            //不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
            next((vm)=> {
                // 通过 `vm` 访问组件实例
                console.log(vm.queryStr)
            })
            //beforeRouteEnter 是支持给 next 传递回调的唯一守卫。
            // 对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。
        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            console.log('...组件内守卫beforeRouteUpdate2222...')
            console.log(to)
            console.log(from)

            next();
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            console.log('...组件内守卫beforeRouteLeave3333...')
            console.log(to)
            console.log(from)

            const answer = window.confirm('真的要离开吗？')
            if (answer) {
                next()
            } else {
                next(false)
            }
        }
    }
</script>

<style scoped class="less">
    .box{
        border: 5px dashed blue; color: blue; padding: 10px;
    }
</style>