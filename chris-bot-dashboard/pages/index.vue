<template>
  <div class="d-flex justify-center">
    <h1>自動推播平台</h1>
    <v-timeline align="start">
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        :dot-color="item.color"
        :icon="item.icon"
        fill-dot
      >
        <v-card>
          <v-card-text class="white text--primary">
            <p>
              {{ item.content }}
            </p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <NuxtChild />
  </div>
</template>

<script setup>
import { mdiYoutube, mdiTwitch, mdiTwitter } from '@mdi/js';

const items = reactive([
  {
    title: 'Youtube',
    color: '#FF0000',
    icon: mdiYoutube,
    content: '建置中'
  },
  {
    title: 'Twitch',
    color: '#6441A4',
    icon: mdiTwitch,
    content: '尚未'
  },
  {
    title: 'Twitter',
    color: '#1DA1F2',
    icon: mdiTwitter,
    content: '尚未'
  }
]);
</script>

<style>
h1 {
  text-align: center;
}
</style>
