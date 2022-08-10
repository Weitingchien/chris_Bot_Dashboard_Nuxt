import { defineStore } from 'pinia';

const defaultUserState = {
  user: {
    userAvatar: null,
    userID: null,
    userName: null
  }
};

const defaultLoginState = false;

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      userAvatar: null,
      userID: null,
      userName: null
    },
    isLogin: false
  }),
  getters: {
    getUser: state => state.user,
    getLoginStatus: state => state.isLogin
  },
  actions: {
    addUserData(newData) {
      this.user = newData;
      this.isLogin = true;
    },
    reset() {
      Object.assign(this.user, defaultUserState);
      this.isLogin = defaultLoginState;
    }
  }
});