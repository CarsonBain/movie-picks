import Vue from "vue";
import Vuex from "vuex";
import * as fb from '@/firebase'
import router from '@/router/index'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      userProfile: {},
    },
    movies: [],
    watchList: []
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
    },
    setWatchList(state, watchList) {
      state.watchList = watchList;
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
        const userProfileDataWithId = {...userProfile.data(), id: user.uid};
        commit('setUserProfile', userProfileDataWithId);
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
    async getWatchList() {
      fb.watchListsCollection.where('user_id', '==', fb.auth.currentUser.uid).orderBy('created_on', 'desc').onSnapshot(snapshot => {
        let watchList = [];
        snapshot.forEach(doc => {
          let movie = doc.data();
          watchList.push(movie)
        })
        store.commit('setWatchList', watchList)
      })      
    },
    async addMovieToWatchList({ state }, movieId) {
      try {
        await fb.watchListsCollection.add({
          user_id : state.user.userProfile.id,
          movie_id: movieId,
          created_on: new Date()
        })
      } catch(e) {
        alert(e);
      }
    },
    async addMovie({ state }, movie) {
      try {
        await fb.moviesCollection.add({
          createdOn: new Date(),
          title: movie.title,
          genres: movie.genres,
          backdropPath: movie.backdropPath,
          posterPath: movie.posterPath,
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
    },
  },
  modules: {},
});

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


export default store;