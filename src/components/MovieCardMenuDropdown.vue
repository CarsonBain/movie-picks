<template>
  <div class="group relative" v-click-outside="hideMenu">
    <button
      @click="showMenu = !showMenu"
      class="rounded-full p-1 bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        class="h-6 w-6 text-gray-50"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
    <transition>
      <div
        v-if="showMenu"
        class="origin-top-right absolute right-0 mt-1 w-48 px-4 py-4 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-ring-5 z-10"
      >
        <ul class="flex flex-col space-y-2 text-sm">
          <li>
            <button
              v-if="movieExistsInWatchList(movie.id)"
              type="button"
              @click="removeMovieFromWatchList(movie.id)"
            >
              Remove from watchlist
            </button>

            <button v-else type="button" @click="addMovieToWatchList(movie.id)">
              Add to my watchlist
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside';
export default {
  props: ['movie'],
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    hideMenu() {
      this.showMenu = false;
    },
    async addMovieToWatchList(movieId) {
      this.hideMenu();
      await this.$store.dispatch('addMovieToWatchList', movieId);
    },
    async removeMovieFromWatchList(movieId) {
      this.hideMenu();
      await this.$store.dispatch('removeMovieFromWatchList', movieId);
    },
    movieExistsInWatchList(movieId) {
      return this.$store.getters.movieExistsInWatchList(movieId);
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
