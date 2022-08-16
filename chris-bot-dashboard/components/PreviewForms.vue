<template>
  <div>
    <v-alert
      transition="scroll-y-transition"
      v-show="formSendingStatus"
      :value="formSendingStatus"
      type="success"
      >{{ formSendingStatus }}</v-alert
    >
    <div class="d-flex align-center flex-column preview">
      <v-card tonal>
        <template v-slot:title> 推薦的頻道</template>
      </v-card>
      <v-list
        v-for="(item, index) in formsStore.getChannelName"
        :key="item.id"
        lines="two"
        select-strategy="multiple"
      >
        <v-list-item :value="item.content">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
            </v-list-item-action>
            <v-list-item-title>{{ item.content }}</v-list-item-title>
            <v-btn
              @click="deleteFormsData(index, 0)"
              :icon="mdiClose"
              v-show="isActive"
              size="small"
              color="red"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-card tonal>
        <template v-slot:title> 推薦的頻道種類 </template>
      </v-card>
      <v-list
        v-for="(item, index) in formsStore.getChannelType"
        :key="item.id"
        lines="two"
        select-strategy="multiple"
      >
        <v-list-item :value="item.content">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
            </v-list-item-action>
            <v-list-item-title>{{ item.content }}</v-list-item-title>
            <v-btn
              @click="deleteFormsData(index, 1)"
              :icon="mdiClose"
              v-show="isActive"
              size="small"
              color="red"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-row class="d-flex justify-center">
        <v-btn :disabled="!valid" class="mr-4 submitbtn" @click="submit()">
          送出
        </v-btn>
        <v-btn :disabled="!valid" class="mr-4 submitbtn" @click="clearAll()">
          全部清除
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { mdiClose } from '@mdi/js';
import { useFormsStore } from '@/store/forms';
import { useLoadingStore } from '@/store/loading';

const formsStore = useFormsStore();
const formSendingStatus = ref(false);
const loadingStore = useLoadingStore();

const valid = ref(
  toRaw(formsStore.getChannelName).length ||
    toRaw(formsStore.getChannelType).length
    ? true
    : false
);

const deleteFormsData = (index, type) => {
  if (type === 0) {
    formsStore.removeChannelName(index);
  } else if (type === 1) {
    formsStore.removeChannelType(index);
  }
};

watch([formsStore.getChannelName, formsStore.getChannelType], () => {
  const getChannelNameFromLoaclStorage = toRaw(
    formsStore.getChannelName
  ).length;
  const getChannelTypeFromLoaclStorage = toRaw(
    formsStore.getChannelType
  ).length;

  if (getChannelNameFromLoaclStorage || getChannelTypeFromLoaclStorage) {
    valid.value = true;
  } else if (
    !getChannelNameFromLoaclStorage &&
    !getChannelTypeFromLoaclStorage
  ) {
    valid.value = false;
  }
});

const submit = async () => {
  loadingStore.isLoading(true);
  valid.value = false;
  const channelsNamesContent = toRaw(formsStore.getChannelName).map(
    el => el.content
  );
  const channelsTypesContent = toRaw(formsStore.getChannelType).map(
    el => el.content
  );

  if (channelsNamesContent.length || channelsTypesContent.length) {
    const formsData = {
      channelsNames: channelsNamesContent,
      channelsTypes: channelsTypesContent
    };
    const { data: formResponseStatus } = await $fetch('/api/v1/forms/submit', {
      method: 'POST',
      body: formsData
    });

    if (formResponseStatus) {
      formSendingStatus.value = formResponseStatus;
      loadingStore.isLoading(false);
      valid.value = true;
    } else {
      formSendingStatus.value = '表單寫入資料庫失敗';
      loadingStore.isLoading(false);
      valid.value = true;
    }
  }
};

watch(formSendingStatus, () => {
  const timer = setTimeout(() => {
    formSendingStatus.value = false;
  }, 3000);
  if (formSendingStatus.value === false) {
    clearTimeout(timer);
  }
});

const clearAll = () => {
  formsStore.clearAll();
};
</script>

<style scoped>
.submitbtn {
  background-color: #42b883;
  color: rgb(0, 0, 0);
}

.v-row {
  margin: 20px 0px 20px 0px;
}
.v-list {
  width: 329.13px;
}
.v-btn {
  margin-left: 12px;
}
.v-list-item-title {
  width: 169.125px;
}
.preview {
  width: 418.25px;
}

.v-tabs {
  background: #424242;
  margin-bottom: 20px;
}
</style>
