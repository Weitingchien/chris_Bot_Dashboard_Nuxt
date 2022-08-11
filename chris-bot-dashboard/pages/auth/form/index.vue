<template>
  <div class="d-flex justify-center">
    <v-card>
      <v-tabs v-model="selectedTab" fixed-tabs>
        <v-tab
          v-for="(item, index) in tabs"
          :key="item.type"
          :value="item.type"
        >
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.description }}
        </v-tab>
      </v-tabs>
      <v-divider class="mb-4"></v-divider>
      <v-window v-model="selectedTab">
        <v-window-item
          v-for="(item, index) in tabs"
          :key="item.type"
          :value="item.type"
        >
          <v-card v-if="index === 0">
            <Forms />
          </v-card>
          <v-card v-else-if="index === 1">
            <PreviewForms />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script setup>
import { mdiListBoxOutline, mdiTextBoxSearchOutline } from '@mdi/js';

const selectedTab = ref(null);

const tabs = reactive([
  { type: 'forms', description: '表單', icon: mdiListBoxOutline },
  {
    type: 'preview',
    description: '預覽/移除/送出',
    icon: mdiTextBoxSearchOutline
  }
]);
</script>
