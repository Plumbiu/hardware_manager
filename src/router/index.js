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

router.beforeEach((to) => {
  if(to.path.includes('login')) {
    return true
  } else {
    const token = localStorage.getItem('hardware_jwt_token')
    if(!token) {
      return '/examples/login'
    }
    return true
  }
})


export default router
