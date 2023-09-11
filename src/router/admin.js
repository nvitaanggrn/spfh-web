export default [
  {
    path: '/admin',
    component: () => import('../admin/DashboardView.vue')
  },
  {
    path: '/admin/form',
    component: () => import('../admin/form/FormView.vue')
  },
  {
    path: '/admin/form/item',
    component: () => import('../admin/form/ItemView.vue')
  },
  {
    path: '/admin/event',
    component: () => import('../admin/event/EventView.vue')
  },
  {
    path: '/admin/event/create',
    component: () => import('../admin/event/CreateView.vue')
  },
  {
    path: '/admin/news',
    component: () => import('../admin/news/NewsView.vue')
  },
  {
    path: '/admin/news/item',
    component: () => import('../admin/news/ItemView.vue')
  },
  {
    path: '/admin/news/create',
    component: () => import('../admin/news/CreateView.vue')
  },
  {
    path: '/admin/news/update',
    component: () => import('../admin/news/UpdateView.vue')
  },
  {
    path: '/admin/feedback',
    component: () => import('../admin/feedback/FeedbackView.vue')
  },
  {
    path: '/admin/users',
    component: () => import('../admin/users/UsersView.vue')
  },
  {
    path: '/admin/users/create',
    component: () => import('../admin/users/CreateView.vue')
  },
  {
    path: '/admin/users/update',
    component: () => import('../admin/users/UpdateView.vue')
  },
  {
    path: '/admin/profile',
    component: () => import('../admin/profile/ProfileView.vue')
  }
];