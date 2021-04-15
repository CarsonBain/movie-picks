<template>
<div class="border-b border-gray-700">
  <nav class="py-6 md:py-8 px-6 md:px-16 flex justify-between items-center max-w-screen-xl mx-auto">
    <div class="text-base md:text-xl uppercase tracking-wider font-extrabold">
      <router-link to="/">Vincent's Picks</router-link>
    </div>
    <div class="flex items-center space-x-5">
     <router-link to="/all-picks">All picks</router-link>
    <div class="group relative"  v-click-outside="hideMenu">
      <button
        @click="showUserMenu = !showUserMenu"
        class="bg-green-100 font-semibold text-green-900 h-8 w-8 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
      >
        {{ userInitials }}
      </button>
      <transition>
        <div
          v-if="showUserMenu"
          class="origin-top-right absolute right-0 mt-2 w-48 px-4 py-4 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-ring-5 z-10"
        >
          <ul class="flex flex-col space-y-3">
            <li>
              <router-link to="/watchlist">My watch list</router-link>
            </li>
            <li>
              <router-link to="/seenlist">My seen movies</router-link>
            </li>
            <li>
              <button type="button" class="text-red-300" @click="logout()">Logout</button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    </div>
  </nav>
</div>
</template>
<script>
import ClickOutside from 'vue-click-outside'

export default {
  data() {
    return {
      showUserMenu: false,
    };
  },
  computed: {
    userInitials() {
      const { first_name, last_name } = this.$store.state.user.userProfile;
      if (first_name && last_name) {
        return `${first_name.charAt(0).toUpperCase()}${last_name
          .charAt(0)
          .toUpperCase()}`;
      }
      // If for some reason first or last name not defined -- return V for Vincent ;)
      return 'V';
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    hideMenu() {
      this.showUserMenu = false;
    }
  },
  watch: {
    '$route'() {
      // Hide menu on route change
      this.showUserMenu = false;
    }
  },
  directives: {
    ClickOutside
  }
};
</script>