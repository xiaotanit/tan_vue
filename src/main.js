import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

new Vue({
  router,  //key名字必须命名为router
  render: h => h(App)
}).$mount('#app')
