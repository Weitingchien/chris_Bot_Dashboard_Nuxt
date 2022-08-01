<template>
  <v-row justify="center" align="center">
    <v-card
      v-for="video in data.data"
      :key="video.videoID"
      tonal
      border
      class="mb-2"
      density="compact"
      :subtitle="video.videoTitle"
      :title="video.videoChannelName"
      variant="text"
      max-width="344"
    >
      <v-layout align-center>
        <v-img
          :class="{ imgnull: video.videoImage ? false : true }"
          :src="video.videoImage"
          :width="video.videoImage ? '210px' : '0px'"
          :height="video.videoImage ? '117.8px' : '0px'"
          cover
        >
        </v-img>
      </v-layout>

      <template v-slot:actions>
        <v-btn color="primary" variant="text">
          <NuxtLink :to="video.videoLink" no-rel target="_blank">
            See in YT
          </NuxtLink>
        </v-btn>
      </template>
    </v-card>
  </v-row>
</template>

<script setup>
const config = useRuntimeConfig();

const { data, pending, error } = await useAsyncData('all', () =>
  $fetch(`${config.public.apiBase}/api/webcrawler/all`)
);
</script>

<style scoped>
.imgnull {
  width: 210px;
  padding-top: 117.8px;
  animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #f0f0f0e7;
  }
  100% {
    background-color: #eee;
  }
}
</style>
