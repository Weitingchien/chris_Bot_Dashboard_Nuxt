import { defineStore } from 'pinia';
import { IUser } from '~~/types/IUser'; 

const defaultUserState = {
  user: {
    data: {
      userID: null,
      userName: null,
      userAvatar: null
    }
  }
};

const defaultLoginState = false;

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      data: {
        userID: null,
        userName: null,
        userAvatar: null
      }
    } as IUser,
    isLogin: false
  }),
  getters: {
    getUser: state => state.user,
    getLoginStatus: state => state.isLogin
  },
  actions: {
    addUserData(newData: IUser) {
      this.user = newData;
      this.isLogin = true;
    },
    reset() {
      Object.assign(this.user, defaultUserState);
      this.isLogin = defaultLoginState;
    }
  }
});
