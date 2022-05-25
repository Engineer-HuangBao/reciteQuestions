const router = [
  {
    name: 'home',
    path: '/',
    component: () => import('../pages/home.vue')
  },
  {
    name: 'answer',
    path: '/answer',
    component: () => import('../pages/answer.vue')
  },
  {
    name: 'support',
    path: '/support',
    component: () => import('../pages/support.vue')
  },
]
export default router