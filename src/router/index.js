import Vue from "vue";
import VueRouter from "vue-router";
import AllPicksPage from '@/views/AllPicksPage.vue';
import HomePage from '@/views/HomePage.vue';
import { auth } from '@/firebase.js';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/all-picks",
    name: "all-picks-page",
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
  scrollBehavior () {
    // Scroll to top on when changing routes
    return { x: 0, y: 0 }
  }
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
