import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/service-and-price',
      name: 'service',
      // route level code-splitting
      // this generates a separate chunk (Service.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ServiceView.vue')
    },
    {
      path: '/become-a-groomer',
      name: 'groomer',
      // route level code-splitting
      // this generates a separate chunk (Groomer.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (Signin.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SigninView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (Signup.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/policy',
      name: 'policy',
      // route level code-splitting
      // this generates a separate chunk (Policy.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PolicyView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      // route level code-splitting
      // this generates a separate chunk (Policy.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ForgotPasswordView.vue')
    }
  ]
})

export default router
