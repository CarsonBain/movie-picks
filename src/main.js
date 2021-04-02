import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/base.css";
import { auth } from './firebase'
import Toasted from 'vue-toasted';
 
Vue.use(Toasted, {singleton: true, router})

Vue.config.productionTip = false;

// Below code ensures Firebase initializes before loading the app when a user refreshes a page.
let app;
auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
