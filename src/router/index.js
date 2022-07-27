import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Layout/login'
import My from '@/views/Layout/My'
import home from '@/views/Layout/home'
import News from '@/views/Layout/News'
import search from '@/views/Layout/search'
import Layout from '@/views/Layout'
import city from '@/components/city'
// import torent from '@/components/torent'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout/home' },

  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '/layout/my',
        component: My
      },
      { path: '/layout/home', component: home },
      { path: '/layout/search', component: search },
      { path: '/layout/news', component: News }
    ]
  },
  { path: '/login', component: Login },
  { path: '/city', component: city },
  {
    path: '/collect',
    component: () => import('@/views/Layout/My/components/collect')
  },
  {
    path: '/rent',
    component: () => import('@/views/Layout/My/components/rent')
  },
  {
    path: '/torent',
    component: () => import('@/components/torent')
  },
  {
    path: '/housinginquiry',
    component: () => import('@/components/torent/Housinginquiry')
  },
  {
    path: '/xqhome/:id',
    component: () => import('@/views/Layout/My/components/xqhome')
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}
export default router
