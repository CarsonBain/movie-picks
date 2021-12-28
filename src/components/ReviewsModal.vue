<template>
  <div
    class="w-full h-full fixed z-20 flex items-center justify-center top-0 right-0"
  >
    <div class="fixed w-full h-full bg-gray-900 opacity-90 top-0 right-0"></div>
    <div
      style="max-height: 85%"
      class="w-11/12 max-w-3xl md:w-8/12 opacity-100 bg-gray-700 z-30 rounded shadow-xl relative p-6 md:p-12 overflow-y-auto"
    >
      <button
        type="button"
        @click="closeModal()"
        class="absolute top-2 right-2 md:top-4 md:right-4 z-30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="flex flex-col overflow-y-auto h-full">
        <h3 class="md:text-lg font-bold mb-2">All reviews</h3>
        <div v-if="existingReviews.length" class="flex flex-col">
          <div
            v-for="existingReview in existingReviews"
            :key="existingReview.id"
            class="border-b border-gray-500 py-6"
          >
            <div class="text-xs flex items-center mb-2 flex-wrap">
              <div class="flex items-center space-x-2">
                <div>
                  <span>Review by </span
                  ><span class="font-bold">{{ existingReview.user_name }}</span>
                </div>
                <div class="flex space-x-1 items-center text-green-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span>{{ existingReview.rating }} </span>
                </div>
              </div>
              <span class="text-gray-300 w-full mt-1 md:mt-0 md:ml-2 md:w-max" v-if="existingReview.created_on">
                {{ convertDate(existingReview.created_on) }}
              </span>
            </div>
            <p class="whitespace-pre-line text-sm leading-normal">
              {{ existingReview.content }}
            </p>
            <div>
              <button
                v-if="currentUserSubmittedReview(existingReview.user_id)"
                type="button"
                @click="deleteReview(existingReview.id)"
                class="flex items-center space-x-1 text-red-300 text-xs mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  /></svg
                ><span>Delete review</span>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center" v-else>
        <div class="text-xl font-bold text-center my-4">
          Be the first person to review this pick!
        </div>
        <div v-if="!$store.state.user.loggedIn"><router-link class="underline" to="/login">Log in</router-link> to write a review</div>
        </div>
        <form
          v-if="$store.state.user.loggedIn"
          @submit.prevent="addReview()"
          class="flex flex-col items-start mt-8"
        >
          <div class="flex flex-col space-y-3 w-full mb-3">
            <label for="review" class="text-sm">Your review</label>
            <textarea
              class="bg-gray-800 border-none rounded"
              id="review"
              v-model="review.content"
              placeholder="Add your review..."
            >
            </textarea>
          </div>
          <div class="flex space-x-3 mb-6 items-end">
            <div class="flex flex-col space-y-3">
              <label for="movie-rating" class="text-sm">Your rating</label>
              <select
                v-model="review.user_rating"
                class="bg-gray-800 border-none rounded"
              >
                <option
                  v-for="(number, index) in 10"
                  :key="index"
                  :value="number"
                >
                  {{ number }}
                </option>
              </select>
            </div>
            <button
              class="bg-black px-4 py-2 text-white rounded font-semibold flex-grow-0"
              :class="[
                canSubmit
                  ? 'bg-gray-200 text-gray-900 cursor-pointer'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed',
              ]"
              type="submit"
            >
              Add review
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reviewsCollection, moviesCollection, auth, firebase } from '@/firebase';

export default {
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      existingReviews: [],
      review: {
        content: '',
        user_rating: '',
      },
    };
  },
  computed: {
    canSubmit() {
      return this.review.content && this.review.user_rating;
    },
  },
  methods: {
    convertDate(date) {
      return new Date(date.seconds * 1000).toDateString();
    },
    async addReview() {
      if (!this.canSubmit) {
        return;
      }

      const newReview = await reviewsCollection.add({
        created_on: new Date(),
        content: this.review.content,
        rating: this.review.user_rating,
        movie_id: this.movieId,
        user_id: auth.currentUser.uid,
        user_name: `${this.$store.state.user.userProfile.first_name} ${this.$store.state.user.userProfile.last_name}`,
      });

      // TODO: is there a better way to get this review and add it?
      const fetchedReview = await reviewsCollection.doc(newReview.id).get();
      this.existingReviews.push({ ...fetchedReview.data(), id: newReview.id });

      await moviesCollection.doc(this.movieId).update({
        review_count: firebase.firestore.FieldValue.increment(1)
      })

      this.review.content = '';
      this.review.user_rating = '';
    },
    async deleteReview(reviewId) {
      await reviewsCollection.doc(reviewId).delete();
      this.existingReviews = this.existingReviews.filter(
        (review) => review.id !== reviewId
      );
      await moviesCollection.doc(this.movieId).update({
        review_count: firebase.firestore.FieldValue.increment(-1)
      })

    },
    closeModal() {
      // TODO: could add validation here to not close if they've written something in the review
      this.$emit('close-modal');
    },
    currentUserSubmittedReview(submittedUserId) {
      if (this.$store.state.user.loggedIn) {
        return submittedUserId === auth.currentUser.uid;
      }
      return false;
    },
  },
  async mounted() {
    const reviewDocs = await reviewsCollection
      .where('movie_id', '==', this.movieId)
      .orderBy('created_on', 'asc')
      .get();
    reviewDocs.forEach((doc) => {
      let review = doc.data();
      review.id = doc.id;
      this.existingReviews.push(review);
    });
  },
};
</script>
<style>
