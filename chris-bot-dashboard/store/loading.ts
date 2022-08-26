import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false
  }),
  getters: {
    getLoading: state => state.loading
  },
  actions: {
    isLoading(val: boolean) {
      this.loading = val;
    }
  }
});
