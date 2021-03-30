<template>
  <nav class="py-8 flex justify-between items-center border-b border-gray-100">
    <div class="text-base md:text-xl uppercase tracking-wide font-extrabold">
        Vincent's Picks
    </div>
    <ul class="flex space-x-3 md:space-x-6 items-center text-sm md:text-base">
      <li>
        <router-link class="py-1" to="/" exact-active-class="border-b-2 border-black">All picks</router-link>
      </li>
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
