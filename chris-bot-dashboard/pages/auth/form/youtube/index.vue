<script setup lang="ts">
import { useLoadingStore } from '~~/store/loading';
const loadingStore = useLoadingStore();
</script>

<template>
  <div>
    <Loading v-if="loadingStore.getLoading" />
    <Tabs />
  </div>
</template>
