import {createRouter, createWebHistory} from 'vue-router'
import admin from './admin'
import enduser from './enduser'
const AdminAuth = () => import('../admin/AuthView.vue')
const EnduserAuthView = () => import('../enduser/AuthView.vue')


const routes = [
  {
    path: '/',
    component: EnduserAuthView,
    children: [{
      path: '',
      component: () => import('../enduser/HomeView.vue'),
      children: enduser
    }],
    props: {
      flags: 0x01,
      redirect: '/signin'
    }
  },
  {
    path: '/signin',
    component: EnduserAuthView,
    children: [{
      path: '',
      component: () => import('../enduser/SigninView.vue')
    }],
    props: {
      flags: 0x02,
      redirect: '/'
    }
  },
  {
    path: '/signup',
    component: EnduserAuthView,
    children: [{
      path: '',
      component: () => import('../enduser/SignupView.vue')
    }],
    props: {
      flags: 0x02,
      redirect: '/'
    }
  },
  {
    path: '/signout',
    component: EnduserAuthView,
    children: [{
      path: '',
      component: () => import('../enduser/SignoutView.vue')
    }],
    props: {
      flags: 0x01,
      redirect: '/'
    }
  },

  {
    path: '/admin',
    component: AdminAuth,
    children: [{
      path: '',
      component: () => import('../admin/AdminView.vue'),
      children: admin
    }],
    props: {
      flags: 0x01,
      redirect: '/admin/signin'
    }
  },
  {
    path: '/admin/signin',
    component: AdminAuth,
    children: [{
      path: '',
      component: () => import('../admin/SigninView.vue')
    }],
    props: {
      flags: 0x02,
      redirect: '/admin'
    }
  },
  {
    path: '/admin/signout',
    component: AdminAuth,
    children: [{
      path: '',
      component: () => import('../admin/SignoutView.vue')
    }],
    props: {
      flags: 0x01,
      redirect: '/'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
