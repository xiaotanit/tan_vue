import Vue from 'vue'
import Router from 'vue-router'
//自定义页面
import PageA from './views/PageA'
import PageB from './views/PageB'
import PageC from './views/PageC'
import PageD from './views/PageD'
// import Home from './views/Home'
import PageModule from './views/PageModule.vue'
import PageWaterFall from './views/PageWaterFall.vue' //瀑布流

//安装路由到vue
Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/pageB',  //重定向，设置默认进入pageB页面
    },
    {
        //动态路径参数，以冒号开头，如果有多个参数则继续往后面追加
        path: '/pageA/:id/:name',
        name: 'pageA',
        component: PageA,
        //路由独享的守卫
        beforeEnter: (to, from, next) => {
            console.log(".....路由独享的守卫...beforeEnter...")
            console.log(to)
            console.log(from)
            // console.log(next)
            next();
        }
    },
    {
        path: '/pageB',
        name: 'pageB',
        component: PageB,
        meta: { isOK: true, type: 9 },
        children: [
            {
                path: 'pageC/:id/:name',
                component: PageC,
                props: true, //设置props属性为true, 则可以在PageC页面中直接取参数
                name: 'subPageC',
                meta: { requiresAuth: true, id: 51666 }, //自定义数据
            }
        ]
    },
    {
        path: '/pageC/:id/:name',
        name: 'pageC',
        props: true, //设置props属性为true, 则可以在PageC页面中直接取参数
        component: PageC
    },
    {
        path: '/pageD',
        name: 'pageD',
        components: {  //演示命名视图
            default: PageD,
            tanA: PageC,
            tanB: PageB
        }
    },
    { //测试模块打包导入导出
        path: '/pageModule',
        name: 'pageModule',
        component: PageModule
    },
    {  //瀑布流演示
        path: '/pageWaterFall',
        name: 'pageWaterFall',
        component: PageWaterFall
    }
]

export default new Router({
    //mode: 'hash', //默认hash模式，hash模式有#；另外还有一种history模式，没有#符号
    mode: 'history', //history模式，没有#符号
    routes,
})

//全局守卫