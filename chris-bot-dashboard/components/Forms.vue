<script setup lang="ts">
import { mdiPlus } from '@mdi/js';
import { useFormsStore } from '~~/store/forms.js';
import { useLoadingStore } from '~~/store/loading';
import { IForm } from '~~/types/IForm';

const formsStore = useFormsStore();
const loadingStore = useLoadingStore();
loadingStore.isLoading(true);

const collectionsNames = await useCollectionNames();

const form = ref<IForm>(null);
const valid = ref(true);
const channelName = ref('');
const channelType = ref('');

const filterCollectionsNames = collectionsNames.map(el => el.split('V')[0]);

if (filterCollectionsNames.length) {
  loadingStore.isLoading(false);
}

const addChannelNameOrType = (type: number) => {
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

  if (form.value) {
    form.value.reset();
  }
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
  (v: string) => v.trim().length !== 0 || '不能全是空格',
  (v: string) => (v && v.length <= 50) || '最多不能超過50個字'
]);

const channelTypeRules = reactive([
  (v: string) => v.trim().length !== 0 || '不能全是空格',
  (v: string) => v.length <= 15 || '最多不能超過15個字'
]);
</script>

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
