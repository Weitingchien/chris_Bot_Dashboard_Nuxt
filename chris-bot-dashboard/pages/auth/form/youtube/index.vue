<template>
  <div>
    <Loading v-if="loadingStore.getLoading" />
    <Tabs />
  </div>
</template>

<script setup>
import { useLoadingStore } from '@/store/loading';
const loadingStore = useLoadingStore();
</script>
