import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
export const useFormsStore = defineStore('forms', {
  state: () => ({
    channelName: useStorage('channelName', [] as object[]),
    channelType: useStorage('channelType', [] as object[])
  }),
  persist: true,
  getters: {
    getChannelName: state => state.channelName,
    getChannelType: state => state.channelType
  },
  actions: {
    addChannelName(data: object) {
      this.channelName.push(data);
    },
    addChannelType(data: object) {
      this.channelType.push(data);
    },
    removeChannelName(index: number) {
      this.channelName.splice(index, 1);
    },
    removeChannelType(index: number) {
      this.channelType.splice(index, 1);
    },
    clearAll() {
      this.channelName.splice(0, this.channelName.length);
      this.channelType.splice(0, this.channelType.length);
    }
  }
});
