<template>
  <div class="d-flex justify-center">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="channelName"
        :counter="50"
        :rules="channelNameRules"
        label="推薦的頻道名"
        required
      >
        <template v-slot:append>
          <v-icon
            v-if="channelNameIconDisplay()"
            color="red"
            @click="addChannelNameOrType(0)"
          >
            {{ mdiPlus }}
          </v-icon>
        </template>
      </v-text-field>

      <v-divider class="my-4"></v-divider>

      <v-item-group multiple>
        <span>youtube自動推播專區目前的頻道種類有: </span>
        <v-item v-for="item in filterCollectionsNames" :key="item">
          <v-chip> {{ item }} </v-chip>
        </v-item>
      </v-item-group>
      <v-divider class="my-4"></v-divider>
      <v-text-field
        v-model="channelType"
        :counter="15"
        :rules="channelTypeRules"
        label="其他推薦的頻道種類"
      >
        <template v-slot:append>
          <v-icon
            color="red"
            v-if="channelTypeIconDisplay()"
            @click="addChannelNameOrType(1)"
          >
            {{ mdiPlus }}
          </v-icon>
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script setup>
import { mdiPlus } from '@mdi/js';
import { useFormsStore } from '@/store/forms.js';
import { useLoadingStore } from '@/store/loading';

const formsStore = useFormsStore();
const loadingStore = useLoadingStore();
loadingStore.isLoading(true);

const { data: collectionsNames } = await $fetch('/api/v1/yt/collectionsnames');

if (collectionsNames.length) {
  loadingStore.isLoading(false);
}
//const { data: allDocuments } = await $fetch('/api/v1/yt/documents');

const form = ref(null);
const valid = ref(true);
const channelName = ref('');
const channelType = ref('');
//const searchVideoChannelName = reactive([]);

const filterCollectionsNames = collectionsNames.map(el => el.split('V')[0]);
//const allVideoChannelName = reactive(getAllVideoChannelName);

/*
const filterVideoChannelName = () => {
  console.log('搜尋中');
  return allVideoChannelName.filter(el => el === channelName.value);
};

const channelNameTextField = reactive([
  { id: Math.floor(Date.now()), content: '' }
]);
*/

const addChannelNameOrType = type => {
  if (type === 0) {
    if (!channelName.value.split(' ').join('').length) return;
    const channelNameData = {
      id: Math.floor(Date.now()),
      content: channelName.value
    };
    formsStore.addChannelName(channelNameData);
    channelName.value = '';
  } else if (type === 1) {
    if (!channelType.value.split(' ').join('').length) return;
    const channelTypeData = {
      id: Math.floor(Date.now()),
      content: channelType.value
    };

    formsStore.addChannelType(channelTypeData);
    channelType.value = '';
  }
  form.value.resetValidation();
};

const channelNameIconDisplay = () => {
  if (channelName.value === null) {
    return false;
  } else if (
    channelName.value.trim().length !== 0 &&
    channelName.value.length <= 50
  ) {
    return true;
  }
  return false;
};

const channelTypeIconDisplay = () => {
  if (channelType.value === null) {
    return false;
  }
  if (channelType.value.trim().length !== 0 && channelType.value.length <= 15) {
    return true;
  }
  return false;
};

const channelNameRules = reactive([
  v => v.trim().length !== 0 || '不能全是空格',
  v => (v && v.length <= 50) || '最多不能超過50個字'
]);

const channelTypeRules = reactive([
  v => v.trim().length !== 0 || '不能全是空格',
  v => v.length <= 15 || '最多不能超過15個字'
]);
</script>

<style scoped>
.resetbtn {
  background-color: #ef5350;
  color: rgb(0, 0, 0);
}

.v-row {
  margin-top: 12px;
}

.v-input__control {
  max-width: 322.25px;
}
.v-text-field {
  margin-left: 40px;
  margin-right: 16px;
}
.v-row {
  margin-bottom: 20px;
}
.v-tabs {
  background: #424242;
  margin-bottom: 20px;
}
</style>
