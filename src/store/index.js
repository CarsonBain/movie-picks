import Vue from "vue";
import Vuex from "vuex";
import * as fb from '@/firebase'
import router from '@/router/index'

Vue.use(Vuex);

// realtime firebase connection
fb.moviesCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let moviesArray = [];

  snapshot.forEach(doc => {
    let movie = doc.data();
    movie.id = doc.id;

    moviesArray.push(movie)
  })

  store.commit('setMovies', moviesArray)
})


const store = new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      userProfile: {},
    },
    movies: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.user.userProfile = val;
    },
    setLoggedIn(state, boolean) {
      state.user.loggedIn = boolean;
    },
    setMovies(state, movies) {
      state.movies = movies;
    }
  },
  actions: {
    async login({ dispatch}, form) {
      // sign user in
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
        dispatch('fetchUserProfile', user);

      } catch (e) {
        // TODO: better error handling
        alert(e);
      }
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      try {
        const userProfile = await fb.usersCollection.doc(user.uid).get();
        commit('setUserProfile', userProfile.data());
        commit('setLoggedIn', true);
      } catch(e) {
        alert(e)
      }
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
      commit('setLoggedIn', false);
      router.push('/login');
    },
    async addMovie({ state }, movie) {
      try {
        await fb.moviesCollection.add({
          createdOn: new Date(),
          title: movie.title,
          genres: movie.genres,
          img: movie.img,
          year: movie.year,
          tmdbId: movie.tmdbId,
          userRating: movie.userRating,
          network: movie.network,
          otherLink: movie.otherLink,
          submittedUserId: fb.auth.currentUser.uid,
          submittedBy: state.user.userProfile.first_name,
          comments: 0,
          likes: 0
        })
      } catch(e) {
        alert(e);
      }
    } 
  },
  modules: {},
});

export default store;