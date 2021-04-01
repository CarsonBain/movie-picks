<template>
  <div class="bg-gray-800 rounded flex flex-col relative">
    <div v-if="showImages">
      <img
        class="rounded-t"
        :src="`https://image.tmdb.org/t/p/w780/${movie.backdropPath}`"
        :alt="`${movie.title} background image`"
      />
    </div>
    <div class="p-6 relative">
      <div class="absolute right-4 -top-4">
        <MovieCardMenuDropdown :movie="movie"> </MovieCardMenuDropdown>
      </div>

      <div class="flex flex-col">
        <span class="font-semibold md:text-lg">{{ movie.title }}</span>
        <div class="flex items-center space-x-2">
          <span>{{ movie.year }}</span>
          <div class="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>

            <span>{{ movie.userRating }}</span>
          </div>
        </div>
      </div>
      <div v-if="movie.genres" class="my-1">
        <span
          v-for="(genre, index) in movie.genres"
          :key="genre.id"
          class="text-sm text-gray-300"
          ><span>{{ genre.name }}</span
          ><span v-if="index + 1 < movie.genres.length">, </span></span
        >
      </div>
      <div class="capitalize mt-1 text-sm" v-if="movie.network !== 'other'">
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
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ movie.submittedBy }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MovieCardMenuDropdown from './MovieCardMenuDropdown.vue';
export default {
  components: { MovieCardMenuDropdown },
  props: ['movie', 'showImages'],

  methods: {},
};
</script>
