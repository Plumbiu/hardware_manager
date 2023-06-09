import { createRouter, createWebHashHistory } from 'vue-router'

const routes= [
  {
    path: '/examples/login',
    component: () => import('../examples/Login.vue')
  },
  {
    path: '/examples/hardware',
    component: () => import('../examples/Hardware.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
