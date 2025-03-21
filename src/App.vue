<script setup>
import { RouterView, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useCommon } from '@/stores/common.store.js';

import CircularProgressBar from '@/components/sharedComponents/CircularProgressBar.vue';

const useCommonStore = useCommon();
let { commonLoaderState } = storeToRefs(useCommonStore);

const route = useRoute();
const init = () => {
  // Call any API call here that needs to happen on app initialization
};

init();
</script>

<template>
  <div class="app-wrapper">
    <RouterView :key="route.fullPath" />
    <CircularProgressBar v-if="commonLoaderState"></CircularProgressBar>
  </div>
  <div id="remIndicator"></div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Unbounded:wght@200..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

.app-wrapper {
  height: 100%;
  width: 100%;
  /* padding: 50px; */
  overflow: hidden;
}

#remIndicator {
  position: absolute;
  top: -10000px;
  left: -10000px;
  background: transparent;
  opacity: 0;
  width: 1rem;
  height: 1rem;
  z-index: 1;
  pointer-events: none;
  visibility: hidden;
}
</style>

<style lang="scss">
/* total width */
.app-wrapper::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}

/* background of the scrollbar except button or resizer */
.app-wrapper::-webkit-scrollbar-track {
  background-color: #fff;
}

/* scrollbar itself */
.app-wrapper::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 4px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
.app-wrapper::-webkit-scrollbar-button {
  display: none;
}
</style>
