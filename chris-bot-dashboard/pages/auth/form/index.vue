<template>
  <div class="d-flex justify-center">
    <v-list-item to="/auth/form/youtube">
      <v-card tonal>
        <v-card-title>Youtube</v-card-title>
        <v-card-subtitle>頻道推薦表單</v-card-subtitle>
        <v-card-text
          >Discord的推播專區會依照各位推薦的頻道來作新增
          目前是5分鐘爬取一次YT網站 如果該頻道有更新影片會發佈到Discord
        </v-card-text>
      </v-card>
    </v-list-item>
  </div>
</template>

<script setup>
const socialMediaPlatforms = reactive([
  'youtube',
  'twitch',
  'twitter',
  'facebook'
]);
</script>

<style scoped>
.v-list-item {
  width: 418.25px;
}
.v-card-text {
  line-height: 24px !important;
  letter-spacing: 3px;
}
</style>
