<template>
  <div class="d-flex justify-center">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-divider class="my-4"></v-divider>
      <v-text-field
        v-for="(item, index) in channelNameTextField"
        :key="item.id"
        v-model="channelName"
        :counter="50"
        :rules="channelNameRules"
        label="推薦的頻道名"
        required
      >
        <template v-slot:append>
          <v-icon color="red" @click="addChannelNameTextField()">
            {{ mdiPlus }}
          </v-icon>
        </template>
        <template v-slot:prepend>
          <v-icon color="green" @click="deleteChannelNameTextField(item)">
            {{ mdiMinus }}
          </v-icon>
          <!--<v-divider vertical class="replaceicon" v-else></v-divider>-->
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
        :counter="50"
        :rules="channelNameRules"
        label="其他推薦的頻道種類"
        required
      >
        <template v-slot:append>
          <v-icon color="red">
            {{ mdiPlus }}
          </v-icon>
        </template>
        <template v-slot:prepend>
          <v-icon color="green">
            {{ mdiMinus }}
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
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> 所有欄位清空 </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script setup>
import { mdiPlus, mdiMinus } from '@mdi/js';

const config = useRuntimeConfig();

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

const channelNameTextField = reactive([
  { id: Math.floor(Date.now()), content: '' }
]);

const addChannelNameTextField = () => {
  const data = {
    id: Math.floor(Date.now()),
    content: channelName.value
  };
  channelName.value = '';
  channelNameTextField.push(data);
  console.log(channelNameTextField);
};

const deleteChannelNameTextField = item => {
  const currentChannelNameTextFieldIndex = channelNameTextField.indexOf(item);
  channelNameTextField.splice(currentChannelNameTextFieldIndex, 1);
};

const channelNameRules = reactive([
  v => !!v || '欄位必填',
  v => (v && v.split(' ').length <= 10) || '空白不能超過10個',
  v => (v && v.length <= 50) || '最多不能超過50個字'
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
  margin-bottom: 20px;
}
.v-tabs {
  background: #424242;
  margin-bottom: 20px;
}
</style>
