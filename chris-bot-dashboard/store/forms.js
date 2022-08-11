import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
export const useFormsStore = defineStore('forms', {
  state: () => ({
    channelName: useStorage('channelName', []),
    channelType: useStorage('channelType', [])
  }),
  getters: {
    getChannelName: state => state.channelName,
    getChannelType: state => state.channelType
  },
  actions: {
    addChannelName(data) {
      console.log('新增');
      this.channelName.push(data);
    },
    addChannelType(data) {
      this.channelType.push(data);
    },
    removeChannelName(index) {
      this.channelName.splice(index, 1);
    },
    removeChannelType(index) {
      this.channelType.splice(index, 1);
    },
    clearAll() {
      this.channelName.splice(0, this.channelName.length);
      this.channelType.splice(0, this.channelType.length);
    }
  }
});
