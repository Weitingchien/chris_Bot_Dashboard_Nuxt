import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    drawer: false
  }),
  actions: {
    displayList() {
      console.log('displayList');
      this.drawer = !this.drawer;
    }
  }
});
