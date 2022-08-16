import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    drawer: false
  }),
  getters: {
    getDrawerStatus: state => state.drawer
  },
  actions: {
    displayList() {
      console.log('displayList');
      this.drawer = !this.drawer;
    }
  }
});
