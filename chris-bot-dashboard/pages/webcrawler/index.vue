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
          </NuxtLink></v-btn
        >
      </template>
    </v-card>
  </v-row>
</template>

<script setup>
const config = useRuntimeConfig();

const { data } = await useAsyncData('all', () =>
  $fetch(`${config.public.apiBase}/api/webcrawler/all`)
);
console.log({ data });
</script>

<style scoped></style>
