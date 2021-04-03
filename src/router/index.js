import Vue from "vue";
import VueRouter from "vue-router";
import AllPicksPage from '@/views/AllPicksPage.vue';
import { auth } from '@/firebase.js';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AllPicksPage",
    component: AllPicksPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: () => import(/* webpackChunkName: "watchList" */ '../views/WatchList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/seenlist',
    name: 'seenlist',
    component: () => import(/* webpackChunkName: "seenList" */ '../views/SeenListPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Check the requiresAuth meta property on each route change
// If requires auth but not logged in, redirect to login
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router;
