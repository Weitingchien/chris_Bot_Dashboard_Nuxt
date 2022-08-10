<template>
  <div class="d-flex justify-center">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="channelName"
        :counter="50"
        :rules="channelNameRules"
        label="推薦的頻道名"
        required
      >
        <template v-slot:append>
          <v-icon color="red" @click="addChannelNameOrType(0)">
            {{ mdiPlus }}
          </v-icon>
        </template>
      </v-text-field>

      <v-list v-for="item in searchVideoChannelName">{{ item }}</v-list>

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
        required
      >
        <template v-slot:append>
          <v-icon color="red" @click="addChannelNameOrType(1)">
            {{ mdiPlus }}
          </v-icon>
        </template>
      </v-text-field>

      <v-row class="d-flex justify-center">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          送出
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> 所有欄位清空 </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script setup>
import { mdiPlus, mdiMinus } from '@mdi/js';
import { useFormsStore } from '@/store/forms.js';

const config = useRuntimeConfig();
const formsStore = useFormsStore();

const [{ data: collectionsNames }, { data: allDocuments }] = await Promise.all([
  $fetch(`${config.public.apiBase}/api/v1/yt/collectionsnames`),
  $fetch(`${config.public.apiBase}/api/v1/yt/documents`)
]);

const form = ref(null);
const valid = ref(true);
const channelName = ref('');
const channelType = ref('');
const searchVideoChannelName = reactive([]);

const filterCollectionsNames = collectionsNames.map(el => el.split('V')[0]);

const getAllVideoChannelName = allDocuments.map(el =>
  el.videoChannelName.toLowerCase()
);
const allVideoChannelName = reactive(getAllVideoChannelName);
console.log(`allVideoChannelName: ${allVideoChannelName}`);

const filterVideoChannelName = () => {
  console.log('搜尋中');
  return allVideoChannelName.filter(el => el === channelName.value);
};

watch(channelName, (oldVal, newVal) => {
  //console.log(oldVal, newVal);
  //searchVideoChannelName = filterVideoChannelName();
});
/*
const channelNameTextField = reactive([
  { id: Math.floor(Date.now()), content: '' }
]);
*/

const addChannelNameOrType = type => {
  if (type === 0) {
    const channelNameData = {
      id: Math.floor(Date.now()),
      content: channelName.value
    };
    formsStore.addChannelName(channelNameData);
    channelName.value = '';
  } else if (type === 1) {
    const channelTypeData = {
      id: Math.floor(Date.now()),
      content: channelType.value
    };
    formsStore.addChannelType(channelTypeData);
    channelType.value = '';
  }
};

/*
const deleteChannelNameTextField = item => {
  const currentChannelNameTextFieldIndex = channelNameTextField.indexOf(item);
  channelNameTextField.splice(currentChannelNameTextFieldIndex, 1);
};
*/

const channelNameRules = reactive([
  v => !!v || '欄位必填',
  v => (v && v.split(' ').length <= 10) || '空白不能超過10個',
  v => (v && v.length <= 50) || '最多不能超過50個字'
]);

const channelTypeRules = reactive([
  v => (v && v.split(' ').length <= 10) || '空白不能超過10個',
  v => (v && v.length <= 15) || '最多不能超過15個字'
]);

const validate = () => {
  form.value.validate();
};
const reset = () => {
  form.value.reset();
};
const resetValidation = () => {
  form.value.resetValidation();
};
</script>

<style scoped>
.v-row {
  margin-top: 12px;
}
.v-text-field {
  margin-left: 40px;
}
.v-row {
  margin-bottom: 20px;
}
.v-tabs {
  background: #424242;
  margin-bottom: 20px;
}
</style>
