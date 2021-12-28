<template>
  <div class="flex flex-col pt-36 md:pt-32 max-w-md mx-auto px-6">
    <h1 class="text-center text-3xl font-bold mb-6">Sign in to your account</h1>
    <h2 class="text-center mb-6">
      Logging in allows you to add and rate your own picks, manage your watch/seen list, and rate other's picks
    </h2>
    <form @submit.prevent="login()" class="flex flex-col w-full">
      <button
        class="bg-gray-200 text-gray-900 px-4 py-4 w-full mt-8 rounded flex items-center space-x-3 font-medium justify-center max-w-xs mx-auto"
        type="submit"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 48 48"
        >
          <defs>
            <path
              id="a"
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
            />
          </defs>
          <clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath>
          <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
          <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
          <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
          <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
        </svg>
        <span>Continue with Google</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    async login() {
      const response = await this.$store.dispatch('registerOrSignInWithGoogle');
      if (response) {
        this.$router.push('/');
      }
    },
  },
};
</script>
