<template>
  <span> Web Crawler</span>
  <br />
  <span>{{ data }} </span>
</template>

<script setup>
const { data } = await useAsyncData('data', () =>
  $fetch('http://localhost:3000/webcrawler/all')
);
</script>
