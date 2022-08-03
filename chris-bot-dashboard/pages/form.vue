<template>
  <div>
    <h5>{{ state }}</h5>
  </div>
</template>

<script setup>
import { useOauth2Store } from '@/store/oauth2.js';

const oauth2 = useOauth2Store();
const state = ref(oauth2.state);
</script>
