<template>
  <div class="h-full min-h-screen bg-gray-900 text-gray-50" id="app">
    <div class="pb-8 md:pb-16 h-full">
      <SiteNav v-if="loggedIn"></SiteNav>
      <div class="px-8 md:px-16 max-w-screen-xl mx-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import SiteNav from '@/components/SiteNav';
export default {
  computed: {
    ...mapState({
      loggedIn: (state) => state.user.loggedIn,
    }),
  },
  components: {
    SiteNav,
  },
  async mounted() {
    await this.$store.dispatch('getWatchList');
    await this.$store.dispatch('getSeenList');
  },
};
</script>
