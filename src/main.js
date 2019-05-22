import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 清除默认样式
import 'reset-css'
// 导入接口
import './apis'
// 导入二次封装的axios
import './utils/bzaxios'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
// 导入mixin
import './mixins'
import '@/components/commons/bzTable'


Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
    if(to.path === '/login'){
      next()
    }else{
        var token = localStorage.getItem('token');
        if(token){
          next()
        }else{
          next({path:'/login',query:{redirect:to.path}})
        }
    }
    next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
