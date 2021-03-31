<template>
  <nav class="py-8 flex justify-between items-center border-b border-gray-100">
    <div class="text-base md:text-xl uppercase tracking-wide font-extrabold">
       <router-link to="/">
        Vincent's Picks
       </router-link>
    </div>
    <ul class="flex space-x-3 md:space-x-6 items-center text-sm md:text-base">
      <li>
        <button class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs md:text-sm" @click="logout()">Logout</button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
