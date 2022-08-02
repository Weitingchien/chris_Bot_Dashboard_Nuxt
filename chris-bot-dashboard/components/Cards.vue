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
        <!--
        <v-img
          :class="{ imgnull: video.videoImage ? false : true }"
          :src="video.videoImage"
          :width="video.videoImage ? '210px' : '0px'"
          :height="video.videoImage ? '117.8px' : '0px'"
          cover
        >
        </v-img>
        -->
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
        <!--
        <v-img
          :class="{ imgnull: video.videoImage ? false : true }"
          :src="video.videoImage"
          :width="video.videoImage ? '210px' : '0px'"
          :height="video.videoImage ? '117.8px' : '0px'"
          cover
        >
        </v-img>
        -->
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
</template>

<script setup>
const config = useRuntimeConfig();

const { data, pending, refresh, error } = await useAsyncData('all', () => {
  console.log('asyncData is executed');
  return $fetch(`${config.public.apiBase}/api/webcrawler/all`);
});

const videos = reactive({
  ApexChannelsInfo: data.value.data.ApexChannelsInfo,
  JTracksChannelsInfo: data.value.data.JTracksChannelsInfo
});

const arrMerge = videos.ApexChannelsInfo.concat(videos.JTracksChannelsInfo);

//const shortsVideos = data.value.data.

const allData = reactive(arrMerge);

const normalVideos = allData.filter(item => item.videoStatus === 'DEFAULT');

const totalNumberOfVideos = computed(() => normalVideos.length);

const shortsVideos = allData.filter(item => item.videoStatus === 'SHORTS');

const totalNumberOfShortsVideos = computed(() => shortsVideos.length);

onMounted(() => {
  console.log('onMounted');
  refresh();
});
</script>

<style scoped>
.v-row {
  margin-top: 10px;
}

.v-layout {
  justify-content: center;
}
</style>
