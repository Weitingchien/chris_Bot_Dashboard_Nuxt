import { defineStore } from 'pinia';
export const useOauth2Store = defineStore('oauth2', () => {
  const state = ref(1000000000);

  return { state };
});
