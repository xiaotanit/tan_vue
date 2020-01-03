<template>
  <div id="app">
    <div id="nav">
      <router-link to="/pageA/5188/王大锤?type=666&sign=day day up">pageA</router-link> |
      <router-link to="/pageB">pageB</router-link> |
      <router-link :to="{ name: 'pageA', params: { id: 666, name:'黄飞鸿' }, query:{ type: 666, sign: 'day day up' }}">命名路由pageA</router-link> |
      <router-link to="/pageB/pageC/666/王大厨">嵌套路由</router-link> |
      <router-link to="/pageD">命名视图</router-link> |
      <router-link to="/pageModule">模块导入导出</router-link> |
    </div>
    <router-view/>
    <!-- 命名视图, 路由视图名字匹配了，就会展示匹配的页面内容 -->
    <router-view name="tanA"/>
    <router-view name="tanB"/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
