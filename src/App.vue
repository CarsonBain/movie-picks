<template>
  <div class="h-full" id="app">
    <div class="px-8 md:px-16 text-gray-900 h-full max-w-screen-xl mx-auto">
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
  methods: {

  }
}
</script>