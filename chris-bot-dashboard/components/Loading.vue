<template>
  <div class="loading-page">
    <v-overlay
      class="d-flex justify-center align-center"
      :model-value="loadingStore.getLoading"
    >
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { useLoadingStore } from '~~/store/loading';
const loadingStore = useLoadingStore();
</script>

<style scoped>
/*
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
*/
</style>
