<template>
  <v-card>
    <v-tabs v-model="selectedTab" fixed-tabs>
      <v-tab v-for="(item, index) in tabs" :key="item.type" :value="item.type">
        <v-badge v-if="index === 1" :content="recommendedDatas" color="error">
          <v-icon size="x-large">{{ item.icon }}</v-icon>
        </v-badge>
        <v-icon size="x-large" v-else>{{ item.icon }}</v-icon>
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
</template>

<script setup>
import { mdiListBoxOutline, mdiTextBoxSearchOutline } from '@mdi/js';
import { useFormsStore } from '~~/store/forms';

const selectedTab = ref(null);
const formsStore = useFormsStore();

const recommendedDatas = computed(
  () => formsStore.getChannelName.length + formsStore.getChannelType.length
);

const tabs = reactive([
  { type: 'forms', description: '表單', icon: mdiListBoxOutline },
  {
    type: 'preview',
    description: '預覽/移除/送出',
    icon: mdiTextBoxSearchOutline
  }
]);
</script>
