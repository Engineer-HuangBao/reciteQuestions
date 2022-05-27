const router = [
  {
    name: 'home',
    path: '/',
    component: () => import('../pages/home.vue')
  },
  {
    name: 'selectedTopic',
    path: '/selectedTopic',
    component: () => import('../pages/selectedTopic.vue'),
  },
  {
    name: 'modify',
    path: '/modify',
    component: () => import('../pages/modify.vue')
  },
  {
    name: 'support',
    path: '/support',
    component: () => import('../pages/support.vue')
  },
]
export default router