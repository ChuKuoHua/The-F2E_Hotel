import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/allRooms',
        name: 'AllRooms',
        component: () => import('@/views/Rooms.vue'),
      },
    ],
  },
  {
    path: '/Roompage/:id',
    name: 'Roompage',
    component: () => import('../views/Roompage.vue')
  },
  {
    path: '*',
    component: () => import('../views/Layout.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
