<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-for="item in channelNameTextField"
        :key="item.id"
        v-model="item.content"
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
        :counter="50"
        :rules="channelNameRules"
        label="其他推薦的頻道種類"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> 所有欄位清空 </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { mdiPlus, mdiMinus } from '@mdi/js';
const config = useRuntimeConfig();

const {
  data: collectionsNames,
  pending,
  refresh,
  error
} = await $fetch(`${config.public.apiBase}/api/v1/yt/collectionsnames`);

const filterCollectionsNames = collectionsNames.map(el => el.split('V')[0]);

const form = ref(null);
const valid = ref(true);
const channelName = ref('');
const channelType = ref('');
const channelNameTextField = reactive([
  { id: Math.floor(Date.now()), content: '' }
]);
const addChannelNameTextField = () => {
  const data = {
    id: Math.floor(Date.now()),
    content: channelName.value
  };
  channelNameTextField.push(data);
  console.log(channelNameTextField);
};

const deleteChannelNameTextField = item => {
  const currentChannelNameTextFieldIndex = channelNameTextField.indexOf(item);
  channelNameTextField.splice(currentChannelNameTextFieldIndex, 1);
};

const select = ref(null);
const checkbox = ref(false);
const items = reactive(['Apex', 'J-Tracks']);
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
