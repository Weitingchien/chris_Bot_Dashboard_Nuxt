<script setup lang="ts">
import { useLoadingStore } from '~~/store/loading';
const loadingStore = useLoadingStore();
//loadingStore.isLoading(true);
</script>

<template>
  <div>
    <Loading v-if="loadingStore.getLoading" />
    <YtCards />
  </div>
</template>
