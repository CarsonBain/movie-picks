<template>
  <div class="mt-8 md:mt-12">
    <h1 class="text-2xl md:text-3xl font-bold">All picks</h1>
    <section class="mt-6">
      <!-- Pick Submission Form -->
      <form
        @submit.prevent="addMovie()"
        class="flex flex-col items-start mb-12"
      >
        <div class="flex flex-col space-y-4 w-full md:w-1/2">
          <div class="flex flex-col w-full relative">
            <label for="movie-title" class="mb-2"
              >Search for a movie to add</label
            >
            <input
              type="text"
              class="bg-gray-800"
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
          <div
            v-if="movie.year || movie.genres"
            class="flex items-center space-x-3"
          >
            <div
              class="font-semibold bg-gray-300 text-gray-900 px-1 rounded"
              v-if="movie.year"
            >
              {{ movie.year }}
            </div>
            <div v-if="movie.genres">{{ movie.genres }}</div>
          </div>
          <div v-if="showRestOfForm">
            <div class="flex items-center space-x-4 mb-3">
              <div class="flex flex-col w-1/2">
                <label class="mb-2" for="movie-rating">Your rating</label>
                <input
                  v-model.trim="movie.userRating"
                  class="bg-gray-800"
                  type="number"
                  min="1"
                  max="10"
                  id="movie-rating"
                  placeholder="Out of 10"
                />
              </div>
              <div class="flex flex-col w-1/2">
                <label class="mb-2" for="movie-network">Network</label>
                <select
                class="bg-gray-800"
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
              class="bg-gray-800"
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
              <button
                @click="clearAddMovieForm()"
                type="button"
                class="text-gray-300 font-semibold px-4 py-2"
              >
                Close form
              </button>
            </div>
          </div>
        </div>
      </form>

      <!-- Picks Listing -->
      <div class="mt-8">
        <p v-if="!movies.length">There are currently no movies added :(</p>
        <div v-else>
          <div class="flex items-center space-x-4">
            <button
              type="button"
              @click="showImages = !showImages"
              class="flex items-center space-x-1 mb-4 md:text-sm text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-700"
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
            <!-- <button
              type="button"
              @click="filterOutMyPicks()"
              class="flex items-center space-x-1 mb-4 md:text-sm text-xs px-2 py-1 bg-gray-100 text-gray-900 rounded"
            >
              <svg
                class="h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                /></svg
              ><span v-if="showMyPicks">Hide my picks</span>
              <span v-else>Show my picks</span>
            </button> -->
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="movie in movies"
              :key="movie.id"
              class="bg-gray-800 rounded flex flex-col relative"
            >
              <div v-if="showImages">
                <img
                  class="rounded-t"
                  :src="`https://image.tmdb.org/t/p/w780/${movie.img}`"
                  :alt="`${movie.title} background image`"
                />
              </div>
              <div class="p-6">
                <div class="flex flex-col">
                  <span class="font-semibold md:text-lg">{{
                    movie.title
                  }}</span>
                  <span>{{ movie.year }}</span>
                </div>
                <div class="my-1">
                  <span class="text-sm text-gray-300">{{ movie.genres }}</span>
                </div>
                <div
                  class="capitalize mt-1 text-sm"
                  v-if="movie.network !== 'other'"
                >
                  {{ movie.network }}
                </div>
                <div class="mt-1 text-sm" v-else>
                  <a
                    class="flex space-x-1 items-center"
                    target="_blank"
                    :href="movie.otherLink"
                    ><span>Link</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
                <div class="text-sm flex space-x-2 items-center mt-2">
                  <div class="flex items-center space-x-1">
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span>{{ movie.userRating }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
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
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{{ movie.submittedBy }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      allPicks: [],
      movieQuery: '',
      movieQueryResults: '',
      showRestOfForm: false,
      showImages: true,
      showMyPicks: true,
      movie: {
        title: '',
        img: '',
        genres: '',
        year: '',
        userRating: '',
        network: '',
        otherLink: '',
        tmdbId: '',
      },
    };
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.user.userProfile,
      movies: (state) => state.movies,
    }),
    canSubmit() {
      return this.movie.title && this.movie.userRating && this.movie.network;
    },
    // allPicksHideMine() {
    //   return this.movies.filter(
    //     (movie) => movie.submittedUserId !== this.userProfile.id
    //   );
    // },
  },
  methods: {
    // filterOutMyPicks() {
    //   this.showMyPicks = !this.showMyPicks;
    //   if (this.showMyPicks === false) {
    //     this.allPicks = this.allPicksHideMine;
    //   } else {
    //     this.allPicks = this.movies;
    //   }
    // },
    getResult(query) {
      if (!query) {
        this.clearAddMovieForm();
      } else {
        // TODO: REMOVE THIS API KEY!
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=d8b2294a5a84a590d5c0f1f53619130b&query=${query}`
          )
          .then(
            (response) =>
              (this.movieQueryResults = response.data.results.slice(0, 5))
          );
        console.log(this.movieQueryResults);
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
      if (
        this.movies.some(
          (addedMovie) => addedMovie.tmdbId === this.movie.tmdbId
        )
      ) {
        alert('This movie has already been added');
        this.clearAddMovieForm();
      } else {
        await this.$store.dispatch('addMovie', this.movie);
        this.clearAddMovieForm();
      }
    },
    selectMovie(movieId) {
      // TODO: REMOVE THIS API KEY!
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=d8b2294a5a84a590d5c0f1f53619130b`
        )
        .then((response) => {
          console.log(response.data);
          const {
            title,
            genres,
            release_date,
            backdrop_path,
            id,
          } = response.data;
          this.movie.title = title;
          const genreNames = genres.map((genre) => {
            return genre.name;
          });
          this.movie.genres = genreNames.join(', ');
          this.movie.year = new Date(release_date).getFullYear();
          console.log(backdrop_path);
          this.movie.img = backdrop_path;
          this.movie.tmdbId = id;
        });

      this.movieQueryResults = '';
      this.showRestOfForm = true;
    },
  },
};
</script>
