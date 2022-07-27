// import router from '@/router'
// import store from '@/store'
// const Address = ['/collect']
// console.log(Address)
// router.beforeEach((to, from, next) => {
//   const isShow = !!store.state.user.token
//   const index = Address.indexOf(to.fullPath)
//   if (index === 0 && isShow === false) {
//     next('/login')
//   } else {
//     next()
//   }
//   // console.log(to, from)
// })
// const isShow = !!store.state.user.token
// router.beforeEach((to, from, next) => {
//   if (to.path === '/collect' && isShow === false) {
//     next('/login') // 阻止路由跳转
//   } else {
//     next() // 正常放行
//   }
// })
