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
      name: 'become-a-groomer',
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
      // this generates a separate chunk (forgot.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      // route level code-splitting
      // this generates a separate chunk (User.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserDashboardView.vue')
    },

    {
      path: '/add-pet',
      name: 'add-pet',
      // route level code-splitting
      // this generates a separate chunk (AddPet.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddPetView.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      // route level code-splitting
      // this generates a separate chunk (UserProfile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserProfileView.vue')
    },
    {
      path: '/user-payment',
      name: 'user-payment',
      // route level code-splitting
      // this generates a separate chunk (UserPayment.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserPaymentView.vue')
    },
    {
      path: '/payment-history',
      name: 'payment-history',
      // route level code-splitting
      // this generates a separate chunk (PaymentHistory.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserPaymentHistoryView.vue')
    },
    {
      path: '/user-orders',
      name: 'user-orders',
      // route level code-splitting
      // this generates a separate chunk (UserOrders.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserOrdersView.vue')
    },
    {
      path: '/user-order-detail',
      name: 'user-order-detail',
      // route level code-splitting
      // this generates a separate chunk (UserOrderDetail.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserOrderDetailView.vue')
    },
    {
      path: '/groomer-dashboard',
      name: 'groomer-dashboard',
      // route level code-splitting
      // this generates a separate chunk (Groomer.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerDashboardView.vue')
    },

    {
      path: '/groomer-profile',
      name: 'groomer-profile',
      // route level code-splitting
      // this generates a separate chunk (GroomerProfile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerProfileView.vue')
    },
    {
      path: '/groomer-address',
      name: 'groomer-address',
      // route level code-splitting
      // this generates a separate chunk (GroomerAddress.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerAddressView.vue')
    },
    {
      path: '/groomer-service',
      name: 'groomer-service',
      // route level code-splitting
      // this generates a separate chunk (GroomerService.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerServiceView.vue')
    },
    {
      path: '/groomer-pet-preferences',
      name: 'groomer-pet-preferences',
      // route level code-splitting
      // this generates a separate chunk (GroomerPetPreferences.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerPetPreferencesView.vue')
    },
    {
      path: '/groomer-description',
      name: 'groomer-description',
      // route level code-splitting
      // this generates a separate chunk (GroomerDescription.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerDescriptionView.vue')
    },
    {
      path: '/earning-history',
      name: 'earning-history',
      // route level code-splitting
      // this generates a separate chunk (EarningHistory.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EarningHistoryView.vue')
    },
    {
      path: '/receive-payment',
      name: 'receive-payment',
      // route level code-splitting
      // this generates a separate chunk (Payment.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReceivePaymentView.vue')
    },

    {
      path: '/groomer-setting',
      name: 'groomer-setting',
      // route level code-splitting
      // this generates a separate chunk (GroomerSetting.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerSettingView.vue')
    },
    {
      path: '/groomer-orders',
      name: 'groomer-orders',
      // route level code-splitting
      // this generates a separate chunk (GroomerOrders.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerOrdersView.vue')
    },
    {
      path: '/groomer-order-detail',
      name: 'groomer-order-detail',
      // route level code-splitting
      // this generates a separate chunk (GroomerOrderDetail.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerOrderDetailView.vue')
    },
    {
      path: '/groomer-list',
      name: 'groomer-list',
      // route level code-splitting
      // this generates a separate chunk (GroomerList.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerListView.vue')
    },
    {
      path: '/groomer-detail',
      name: 'groomer-detail',
      // route level code-splitting
      // this generates a separate chunk (GroomerDetail.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroomerDetailView.vue')
    },
    {
      path: '/confirm-groomer',
      name: 'confirm-groomer',
      // route level code-splitting
      // this generates a separate chunk (ConfirmGroomer.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConfirmGroomerView.vue')
    }
  ]
})

export default router
