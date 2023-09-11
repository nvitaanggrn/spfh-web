export default [
  {
    path: '/',
    component: () => import('../enduser/DashboardView.vue')
  },
  {
    path: '/form',
    component: () => import('../enduser/form/FormView.vue')
  },
  {
    path: '/form/item',
    component: () => import('../enduser/form/ItemView.vue')
  },
  {
    path: '/form/create',
    component: () => import('../enduser/form/CreateView.vue')
  },
  {
    path: '/event',
    component: () => import('../enduser/event/EventView.vue')
  },
  {
    path: '/news',
    component: () => import('../enduser/news/NewsView.vue')
  },
  {
    path: '/news/item',
    component: () => import('../enduser/news/ItemView.vue')
  },
  {
    path: '/feedback',
    component: () => import('../enduser/feedback/FeedbackView.vue')
  },
  {
    path: '/profile',
    component: () => import('../enduser/profile/ProfileView.vue')
  }
];