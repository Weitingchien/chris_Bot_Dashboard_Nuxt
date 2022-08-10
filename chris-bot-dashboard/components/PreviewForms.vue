<template>
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
    </v-card>
  </div>
</template>

<script setup>
import { mdiYoutube, mdiClose } from '@mdi/js';
import { useFormsStore } from '@/store/forms';

const isChecked = ref(false);
const formsStore = useFormsStore();
console.log(formsStore.getChannelName);
const deleteFormsData = (index, type) => {
  if (type === 0) {
    formsStore.removeChannelName(index);
  } else if (type === 1) {
    formsStore.removeChannelType(index);
  }
};
</script>

<style scoped>
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
