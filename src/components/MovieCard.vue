<template>
  <div class="bg-gray-800 rounded flex flex-col relative">
    <!-- Sometimes the api doesnt return a backdrop path -->
    <!-- TODO: add a placeholder image -->
    <div v-if="showImages && movie.backdropPath">
      <img
        class="rounded-t"
        :src="`https://image.tmdb.org/t/p/w780/${movie.backdropPath}`"
        :alt="`${movie.title} background image`"
      />
    </div>
    <div class="p-6 relative">
      <div v-if="$store.state.user.loggedIn" class="absolute right-4 -top-4">
        <MovieCardMenuDropdown :movie="movie"> </MovieCardMenuDropdown>
      </div>

      <div class="flex flex-col">
        <span class="font-semibold md:text-lg">{{ movie.title }}</span>
        <div class="flex items-center space-x-3">
          <span>{{ movie.year }}</span>
          <div class="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>

            <span>{{ movie.userRating }}</span>
          </div>
          <button
            v-if="movie.overview"
            type="button"
            @click="showSynopsis = !showSynopsis"
            class="flex space-x-1 items-center text-sm focus:outline-none focus:ring-1 focus:ring-white rounded"
          >
            <span>Synopsis</span>

            <svg
              v-if="!showSynopsis"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <p class="text-xs md:text-sm my-2 leading-normal" v-if="showSynopsis">
        {{ movie.overview }}
      </p>
      <div v-if="movie.genres" class="my-1">
        <span v-for="(genre, index) in movie.genres" :key="genre.id" class="text-sm text-gray-300"
          ><span>{{ genre.name }}</span
          ><span v-if="index + 1 < movie.genres.length">, </span></span
        >
      </div>
      <div class="capitalize mt-1 text-sm" v-if="movie.network !== 'other'">
        {{ movie.network }}
      </div>
      <div class="mt-1 text-sm" v-else>
        <a class="flex space-x-1 items-center" target="_blank" :href="movie.otherLink"
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
      <div class="text-sm flex justify-between items-center mt-3">
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
          <span class="text-xs">{{ movie.submittedBy }}</span>
        </div>
        <button type="button" @click="showReviewModal = true" class="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clip-rule="evenodd"
            />
          </svg>
          <span> {{ movie.review_count || 0 }}</span>
        </button>
      </div>
    </div>
    <ReviewsModal @close-modal="showReviewModal = false" v-if="showReviewModal" :movieId="movie.id"></ReviewsModal>
  </div>
</template>
<script>
import MovieCardMenuDropdown from './MovieCardMenuDropdown.vue';
import ReviewsModal from './ReviewsModal.vue';
export default {
  components: { MovieCardMenuDropdown, ReviewsModal },
  props: ['movie', 'showImages'],
  data() {
    return {
      showReviewModal: false,
      showSynopsis: false,
    };
  },
};
</script>
