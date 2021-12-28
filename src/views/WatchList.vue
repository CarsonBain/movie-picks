<template>
  <div class="mt-8 md:mt-12 px-6 md:px-16">
    <h1 class="text-2xl md:text-3xl font-bold">{{ userName }}'s watch list</h1>
    <section class="mt-6">
      <div class="mt-8">
        <div class="flex flex-col items-center mx-auto mt-16 max-w-lg" v-if="!moviesToWatch.length">
          <p class="text-center text-xl font-semibold">You don't have any movies added to your watch list!</p>
          <router-link
            class="font-semibold bg-gray-100 text-gray-900 p-2 mt-6 rounded flex items-center space-x-1"
            to="/"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              /></svg
            ><span>Add some</span></router-link
          >
        </div>
        <div v-else>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MovieCard v-for="movie in moviesToWatch" :movie="movie" :showImages="true" :key="movie.id"></MovieCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MovieCard from '../components/MovieCard.vue';
export default {
  components: { MovieCard },
  computed: {
    ...mapState({
      watchList: (state) => state.watchList,
      userName: (state) => state.user.userProfile.display_name,
      movies: (state) => state.movies,
    }),
    moviesToWatch() {
      // TODO: need to sort this by date added to watchlist
      const watchListIds = this.watchList.map((watchItem) => watchItem.movie_id);
      return this.movies.filter((movie) => {
        return watchListIds.includes(movie.id);
      });
    },
  },
};
</script>
