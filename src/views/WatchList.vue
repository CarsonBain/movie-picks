<template>
  <div class="mt-8 md:mt-12">
    <h1 class="text-2xl md:text-3xl font-bold">{{ userName }}'s list</h1>
    <section class="mt-6">
      <div class="mt-8">
        <p v-if="!movies.length">There are currently no movies added :(</p>
        <div v-else>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MovieCard
              v-for="movie in moviesToWatch"
              :movie="movie"
              :showImages="true"
              :key="movie.id"
            ></MovieCard>
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
      userName: (state) => state.user.userProfile.first_name,
      movies: (state) => state.movies,
    }),
    moviesToWatch() {
      const watchListIds = this.watchList.map(
        (watchItem) => watchItem.movie_id
      );
      return this.movies.filter((movie) => {
        return watchListIds.includes(movie.id);
      });
    },
  },
  async mounted() {
      this.$store.dispatch('getWatchList');
  },
};
</script>
