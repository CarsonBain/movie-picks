<template>
  <div class="flex flex-col pt-48 md:pt-96 max-w-sm mx-auto">
    <h1 class="text-center text-2xl font-bold mb-8">Sign in to your account</h1>
    <form
      @submit.prevent="login()"
      class="flex flex-col w-full"
    >
      <div class="flex flex-col w-full mb-3">
        <label for="user-email" class="text-left mb-1">Email</label>
        <input
          v-model="loginForm.email"
          type="email"
          id="user-email"
          placeholder="vincent@vincentspicks.com"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="user-password" class="mb-1 text-left">Password</label>
        <input
          v-model="loginForm.password"
          type="password"
          id="user-password"
          placeholder="••••••••"
        />
      </div>
      <button class="bg-black text-white px-4 py-2 w-full mt-8 rounded" type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });

      this.$router.push('/');
    },
  },
};
</script>
