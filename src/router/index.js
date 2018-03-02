import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['../pages/Login.vue'], resolve)
      }
    },
    {
      path: '/system_main',
      name: 'system_main',
      component: (resolve) => {
        require(['../pages/System_main.vue'], resolve)
      }
    }
  ]
})

export default router
