<template>
  <div>
    <span> Web Crawler</span>
    <v-card
      v-for="video in videos.data"
      :key="video.videoID"
      border
      class="mb-2"
      density="compact"
      :subtitle="video.videoTitle"
      title="Cuba"
      variant="text"
    >
      <v-img
        src="https://picsum.photos/512/128?image=660"
        height="128"
        cover
      ></v-img>

      <v-card-text>
        During my last trip to South America, I spent 2 weeks traveling through
        Patagonia in Chile.
      </v-card-text>

      <template v-slot:actions>
        <v-btn color="primary" variant="text">View More</v-btn>

        <v-btn color="primary" variant="text">See in Map</v-btn>
      </template>
    </v-card>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const { videos } = await useAsyncData('videos', () =>
  $fetch(`${config.public.apiBase}/api/webcrawler/all`)
);
</script>
