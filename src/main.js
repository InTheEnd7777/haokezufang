import Vue from 'vue'
import App from './App.vue'
import Vant, { Lazyload } from 'vant'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import 'amfe-flexible'
import 'vant/lib/index.css'
import pinyin from 'js-pinyin'

Vue.use(Vant)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  pinyin,
  render: (h) => h(App)
}).$mount('#app')
