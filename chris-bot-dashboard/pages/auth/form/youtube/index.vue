<template>
  <div>
    <div v-if="loadingStore.getLoading">
      <Loading />
    </div>
    <div class="d-flex justify-center">
      <Tabs />
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore } from '@/store/loading';
const loadingStore = useLoadingStore();
</script>
