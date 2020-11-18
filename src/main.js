import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
// 导入NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
// 瀑布流插件
import { VueMasonryPlugin } from 'vue-masonry'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(VueMasonryPlugin)

// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/img/lazyload/err.gif',
  loading: './assets/img/lazyload/loading.jpg',
  attempt: 1
})
// 导入api接口
axios.defaults.baseURL = 'http://127.0.0.1:3000/API/'
// axios.defaults.baseURL = 'http://api.konu1.cn/API/'
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
// 时间戳
Vue.filter('dateFormat', originVal => {
  //  时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const date = new Date(originVal * 1000)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const sdate = ('0' + date.getDate()).slice(-2)
  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)
  const second = ('0' + date.getSeconds()).slice(-2)
  // 拼接
  var result = `${year}-${month}-${sdate} ${hour}:${minute}:${second}`
  // 返回
  return result
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
