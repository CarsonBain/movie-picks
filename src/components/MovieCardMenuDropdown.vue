<template>
  <div class="group relative" v-click-outside="hideMenu">
    <button
      @click="showMenu = !showMenu"
      class="rounded-full p-1 bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </button>
    <transition>
      <div
        v-if="showMenu"
        class="origin-top-right absolute right-0 mt-1 w-52 px-4 py-4 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-ring-5 z-10"
      >
        <ul class="flex flex-col space-y-2 text-sm">
          <li class="py-1">
            <button
              v-if="movieExistsInWatchList(movie.id)"
              class="flex items-center space-x-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
              type="button"
              @click="removeMovieFromWatchList(movie.id)"
            >
              <svg
                class="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
              <span> Remove from watch list </span>
            </button>

            <button
              v-else
              type="button"
              class="flex items-center space-x-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
              @click="addMovieToWatchList(movie.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="h-3 w-3"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span> Add to my watchlist </span>
            </button>
          </li>
          <li class="py-1">
            <button
              v-if="movieExistsInSeenList(movie.id)"
              type="button"
              class="flex items-center space-x-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
              @click="removeMovieFromSeenList(movie.id)"
            >
              <svg
                class="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span> Remove from seen list </span>
            </button>
            <button
              v-else
              type="button"
              class="flex items-center space-x-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
              @click="addMovieToSeenList(movie.id)"
            >
              <svg
                class="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span> Seen it </span>
            </button>
          </li>
          <!-- Can't delete a pick unless you are the user that submitted it -->
          <li class="py-1" v-if="currentUserSubmittedMovie(movie.id)">
            <button
              type="button"
              class="flex items-center space-x-2 focus:outline-none focus:ring-1 focus:ring-gray-600 text-red-300"
              @click="deleteMovie(movie.id)"
            >
              <svg
                class="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span> Delete movie </span>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside';

const toastSettings = {
  duration: 2000,
  position: 'bottom-center',
  className: [
    'shadow-lg',
    'rounded',
    'bg-green-100',
    'py-4',
    'text-green-900',
    'font-semibold',
  ],
  containerClass: ['w-10/12', 'lg:w-max'],
};

export default {
  props: ['movie'],
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    hideMenu() {
      this.showMenu = false;
    },
    currentUserSubmittedMovie(movieId) {
      return this.$store.getters.currentUserSubmittedMovie(movieId);
    },
    async addMovieToSeenList(movieId) {
      this.hideMenu();
      await this.$store.dispatch('addMovieToSeenList', movieId);
      this.$toasted.show('Added to seen list!', toastSettings);
    },
    async removeMovieFromSeenList(movieId) {
      this.hideMenu();
      await this.$store.dispatch('removeMovieFromSeenList', movieId);
      this.$toasted.show('Removed from seen list!', toastSettings);
    },
    async addMovieToWatchList(movieId) {
      this.hideMenu();
      await this.$store.dispatch('addMovieToWatchList', movieId);
      // TODO: abstract these classes or make a component
      this.$toasted.show('Added to watch list!', toastSettings);
    },
    async removeMovieFromWatchList(movieId) {
      this.hideMenu();
      await this.$store.dispatch('removeMovieFromWatchList', movieId);
      this.$toasted.show('Removed from watch list!', toastSettings);
    },
    movieExistsInWatchList(movieId) {
      return this.$store.getters.movieExistsInWatchList(movieId);
    },
    movieExistsInSeenList(movieId) {
      return this.$store.getters.movieExistsInSeenList(movieId);
    },
    async deleteMovie(movieId) {
      this.hideMenu();
      await this.$store.dispatch('deleteMovie', movieId);
      this.$toasted.show('Movie removed!', toastSettings);
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
