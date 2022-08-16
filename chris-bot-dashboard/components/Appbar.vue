<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      v-show="displayBar()"
      @click.stop="navigationStore.displayList"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn
      v-show="!displayBar()"
      to="/"
      aria-label="Dashboard"
      icon
      placeholder="Dashboard"
    >
      <v-icon> {{ mdiViewDashboard }} </v-icon>
    </v-btn>
    <v-btn
      v-show="!displayBar()"
      to="/webcrawler"
      aria-label="SpiderWeb"
      icon
      placeholder="SpiderWeb"
    >
      <v-icon>{{ mdiSpiderWeb }}</v-icon>
    </v-btn>
    <v-btn
      v-show="!displayBar()"
      to="/auth/form"
      aria-label="Form"
      icon
      placeholder="Form"
    >
      <v-icon> {{ mdiListBoxOutline }} </v-icon>
    </v-btn>
    <v-btn
      v-if="!displayBar() && !userStore.getLoginStatus"
      icon
      placeholder="Login"
      :href="oauth2Url"
    >
      <v-icon>{{ mdiLogin }}</v-icon>
    </v-btn>

    <v-menu
      bottom
      min-width="200px"
      rounded
      v-else-if="userStore.getLoginStatus"
    >
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar>
            <v-img
              :src="`https://cdn.discordapp.com/avatars/${userStore.getUser.userID}/${userStore.getUser.userAvatar}`"
              :alt="userStore.getUser.userName"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar>
              <v-img
                :src="`https://cdn.discordapp.com/avatars/${userStore.getUser.userID}/${userStore.getUser.userAvatar}.png`"
                :alt="userStore.getUser.userName"
              ></v-img>
            </v-avatar>
            <h3>
              {{ userStore.getUser.userName }}
            </h3>
            <v-divider class="my-3"></v-divider>
            <v-btn @click="logout" rounded> logout </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import {
  mdiSpiderWeb,
  mdiViewDashboard,
  mdiLogin,
  mdiListBoxOutline
} from '@mdi/js';
import { useUserStore } from '~~/store/user.js';
import { useNavigationStore } from '@/store/navigation';

const userStore = useUserStore();
const navigationStore = useNavigationStore();

const { width } = useWindowSize();

const config = useRuntimeConfig();

const displayBar = () => (width.value <= 400 ? true : false);

const oauth2Url = ref(config.public.discordOauth2Url);

const logout = async () => {
  console.log('logout');
  const { data } = await useFetch(`/api/logout`);
  userStore.reset();

  if (data.value) {
    window.location.reload(true);
  }
};
</script>

<style scoped>
.v-btn {
  margin-right: 30px;
}
</style>
