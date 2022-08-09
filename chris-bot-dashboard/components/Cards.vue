<template>
  <span class="text-h5">Videos: {{ totalNumberOfVideos }}</span>
  <v-row justify="center" align="center">
    <v-card
      v-for="video in normalVideos"
      :key="video.videoID"
      tonal
      border
      class="mb-2"
      density="compact"
      :subtitle="video.videoTitle"
      :title="video.videoChannelName"
      variant="text"
      max-width="210"
    >
      <v-layout align-center>
        <iframe
          width="210"
          height="117.8"
          :src="`https://www.youtube.com/embed/${video.videoID}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
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
  <span class="text-h5">Shorts: {{ totalNumberOfShortsVideos }}</span>
  <v-row justify="center" align="center">
    <v-card
      v-for="video in shortsVideos"
      :key="video.videoID"
      tonal
      border
      class="mb-2"
      density="compact"
      :subtitle="video.videoTitle"
      :title="video.videoChannelName"
      variant="text"
      max-width="210"
    >
      <v-layout align-center>
        <iframe
          width="210"
          height="117.8"
          :src="`https://www.youtube.com/embed/${video.videoID}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
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

  <span class="text-h5">Live: {{ totalNumberOfLiveVideos }}</span>
  <v-row justify="center" align="center">
    <v-card
      v-for="video in liveVideos"
      :key="video.videoID"
      tonal
      border
      class="mb-2"
      density="compact"
      :subtitle="video.videoTitle"
      :title="video.videoChannelName"
      variant="text"
      max-width="210"
    >
      <v-layout align-center>
        <iframe
          width="210"
          height="117.8"
          :src="`https://www.youtube.com/embed/${video.videoID}?origin=${config.public.apiBase}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
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

const { data, pending, refresh, error } = await $fetch(
  `${config.public.apiBase}/api/webcrawler/all`
);

const videos = reactive({
  ApexChannelsInfo: data.ApexChannelsInfo,
  JTracksChannelsInfo: data.JTracksChannelsInfo
});

const arrMerge = videos.ApexChannelsInfo.concat(videos.JTracksChannelsInfo);

const allData = reactive(arrMerge);

const normalVideos = allData.filter(item => item.videoStatus === 'DEFAULT');

const totalNumberOfVideos = computed(() => normalVideos.length);

const shortsVideos = allData.filter(item => item.videoStatus === 'SHORTS');

const liveVideos = allData.filter(item => item.videoStatus === 'LIVE');

const totalNumberOfShortsVideos = computed(() => shortsVideos.length);

const totalNumberOfLiveVideos = computed(() => liveVideos.length);
</script>

<style scoped>
.v-row {
  margin-top: 10px;
}

.v-layout {
  justify-content: center;
}
</style>
