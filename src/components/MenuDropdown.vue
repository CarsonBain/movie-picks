<template>
  <div class="group relative" v-click-outside="hideMenu">
    <button @click="showMenu = !showMenu" :class="buttonClasses">
      <slot name="button"></slot>
    </button>
    <transition>
      <div
        v-if="showMenu"
        tabindex="0"
        class="origin-top-right absolute right-0 mt-1 w-48 px-4 py-4 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-ring-5 z-10"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside';
export default {
    props: [ 'buttonClasses' ],
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    hideMenu() {
      this.showMenu = false;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
