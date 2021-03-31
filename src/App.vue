<template>
  <div class="h-full min-h-screen bg-gray-900 text-gray-50" id="app">
    <div class="px-8 pb-8 md:pb-16 md:px-16 h-full max-w-screen-xl mx-auto">
    <SiteNav v-if="loggedIn"></SiteNav>
    <router-view />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'
export default { 
  computed: {
    ...mapState({
      loggedIn: state => state.user.loggedIn
    }),
  },
  components: {
    SiteNav
  },
}
</script>