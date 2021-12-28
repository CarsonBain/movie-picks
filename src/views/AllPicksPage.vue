<template>
  <div class="mt-8 md:mt-12">
    <h1 class="text-2xl md:text-3xl font-bold px-6 md:px-16">All picks</h1>
    <section class="mt-6">
      <!-- Pick Submission Form -->
      <form
        v-if="$store.state.user.loggedIn"
        @submit.prevent="addMovie()"
        class="flex flex-col items-start px-6 md:px-16"
      >
        <div class="flex flex-col space-y-4 w-full md:w-1/2">
          <div class="flex flex-col w-full relative">
            <label for="movie-title" class="mb-2">Search for a movie to add</label>
            <input
              type="text"
              class="bg-gray-800 border-none rounded"
              id="movie-title"
              v-model="movie.title"
              placeholder="Movie title"
              @keyup="getResult(movie.title)"
            />
            <div
              v-if="movieQueryResults.length"
              class="absolute top-full bg-gray-700 shadow-lg mt-2 rounded w-full z-10"
            >
              <div
                v-for="result in movieQueryResults"
                :key="result.id"
                class="w-full cursor-pointer hover:bg-gray-600 px-4 py-3 flex flex-col"
                @click="selectMovie(result.id)"
              >
                <span>
                  {{ result.title }}
                </span>
                <span class="text-sm text-gray-400">
                  {{ new Date(result.release_date).getFullYear() }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="movie.year || movie.genres" class="flex items-center space-x-3">
            <div class="font-semibold bg-gray-300 text-gray-900 px-1 rounded" v-if="movie.year">
              {{ movie.year }}
            </div>
            <div v-if="movie.genres">
              <span v-for="(genre, index) in movie.genres" :key="genre.id"
                ><span>{{ genre.name }}</span
                ><span v-if="index + 1 < movie.genres.length">, </span></span
              >
            </div>
          </div>
          <div v-if="showRestOfForm">
            <div class="flex items-center space-x-4 mb-3">
              <div class="flex flex-col w-1/2">
                <label class="mb-2" for="movie-rating">Your rating</label>
                <select v-model="movie.userRating" class="bg-gray-800 border-none rounded">
                  <option v-for="(number, index) in ratingScale" :key="index" :value="number">
                    {{ number }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col w-1/2">
                <label class="mb-2" for="movie-network">Network</label>
                <select
                  class="bg-gray-800 border-none rounded"
                  v-model.trim="movie.network"
                  id="movie-network"
                  placeholder="8.7"
                >
                  <option value="netflix">Netflix</option>
                  <option value="crave">Crave</option>
                  <option value="prime">Prime</option>
                  <option value="disney">Disney</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div class="flex flex-col" v-if="movie.network === 'other'">
              <label class="mb-2" for="movie-other-link">Link to stream</label>
              <input
                class="bg-gray-800 border-none rounded"
                v-model.trim="movie.otherLink"
                type="text"
                id="movie-other-link"
                placeholder="https://www.putlocker.com"
              />
            </div>
            <!-- TODO: add some validation -->
            <div class="flex items-center space-x-2 mt-8">
              <button
                :disabled="!canSubmit"
                class="bg-black px-4 py-2 text-white rounded font-semibold"
                :class="[
                  canSubmit
                    ? 'bg-gray-200 text-gray-900 cursor-pointer'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed',
                ]"
                type="submit"
              >
                Add movie
              </button>
              <button @click="clearAddMovieForm()" type="button" class="text-gray-300 font-semibold px-4 py-2">
                Close form
              </button>
            </div>
          </div>
        </div>
      </form>

      <!-- Picks Listing -->
      <div class="mt-6">
        <div
          class="flex flex-col items-center mx-auto mt-16 max-w-lg px-6 md:px-16"
          v-if="!$store.getters.allPicksWithoutSeenMovies(currentFilter).length"
        >
          <p class="text-center text-xl font-semibold">There are no current picks :(</p>
        </div>
        <div v-else>
          <div class="flex items-center space-x-4 px-6 md:px-16">
            <button
              type="button"
              @click="showImages = !showImages"
              class="flex items-center space-x-1 md:text-sm text-xs py-2 text-gray-300 underline focus:outline-none focus:ring-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                /></svg
              ><span v-if="showImages">Hide images</span>
              <span v-else>Show images</span>
            </button>
          </div>

          <!-- Genre filtering -->
          <!-- TODO: figure out how to resolve margins for flex wrap -- maybe use grid -->
          <div class="flex gap-3 items-center py-4 mb-4 overflow-x-auto pl-6 md:pl-16 md:flex-wrap">
            <button
              type="button"
              @click="currentFilter = ''"
              :class="[currentFilter === '' ? 'bg-gray-200 text-gray-900' : '']"
              class="border-gray-200 border rounded px-2 flex-shrink-0 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-white"
            >
              All
            </button>
            <button
              type="button"
              @click="currentFilter = genre"
              :class="[currentFilter === genre ? 'bg-gray-200 text-gray-900' : '']"
              class="border-gray-200 border rounded px-2 flex-shrink-0 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-white"
              v-for="(genre, index) in genreList"
              :key="index"
            >
              {{ genre }}
            </button>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16">
            <MovieCard
              v-for="movie in $store.getters.allPicksWithoutSeenMovies(currentFilter)"
              :movie="movie"
              :showImages="showImages"
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
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

export default {
  components: { MovieCard },
  data() {
    return {
      currentFilter: '',
      movieQuery: '',
      movieQueryResults: '',
      showRestOfForm: false,
      showImages: true,
      showMyPicks: true,
      ratingScale: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      movie: {
        title: '',
        backdropPath: '',
        posterPath: '',
        genres: '',
        year: '',
        userRating: '',
        network: '',
        otherLink: '',
        tmdbId: '',
        overview: '',
      },
    };
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.user.userProfile,
      movies: (state) => state.movies,
    }),
    canSubmit() {
      const choseOtherNetwork = this.movie.network === 'other';
      if (choseOtherNetwork) {
        return this.movie.title && this.movie.userRating && this.movie.network && this.movie.otherLink;
      }
      return this.movie.title && this.movie.userRating && this.movie.network;
    },
    genreList() {
      const genreNames = [];
      this.$store.getters.allPicksWithoutSeenMovies('').forEach((movie) => {
        movie.genres.forEach((genre) => {
          genreNames.push(genre.name);
        });
      });
      return [...new Set(genreNames)];
    },
  },
  methods: {
    getResult(query) {
      if (!query) {
        this.clearAddMovieForm();
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=d8b2294a5a84a590d5c0f1f53619130b&query=${query}&include_adult=false`
          )
          .then((response) => (this.movieQueryResults = response.data.results.slice(0, 5)));
      }
    },
    clearAddMovieForm() {
      this.movie.title = '';
      this.movie.img = '';
      this.movie.genres = '';
      this.movie.year = '';
      this.movie.userRating = '';
      this.movie.network = '';
      this.movie.otherLink = '';
      this.movie.tmdbId = '';
      this.showRestOfForm = false;
      this.movieQueryResults = '';
    },
    async addMovie() {
      if (!this.canSubmit) {
        return;
      }
      if (this.movies.some((addedMovie) => addedMovie.tmdbId === this.movie.tmdbId)) {
        alert('This movie has already been added');
        this.clearAddMovieForm();
      } else {
        await this.$store.dispatch('addMovie', this.movie);
        this.clearAddMovieForm();
      }
    },

    selectMovie(movieId) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=d8b2294a5a84a590d5c0f1f53619130b`)
        .then((response) => {
          const { title, genres, release_date, backdrop_path, poster_path, overview, id } = response.data;
          this.movie.title = title;
          this.movie.genres = genres;
          this.movie.year = new Date(release_date).getFullYear();
          this.movie.backdropPath = backdrop_path;
          this.movie.posterPath = poster_path;
          this.movie.tmdbId = id;
          this.movie.overview = overview;
        });

      this.movieQueryResults = '';
      this.showRestOfForm = true;
    },
  },
};
</script>
