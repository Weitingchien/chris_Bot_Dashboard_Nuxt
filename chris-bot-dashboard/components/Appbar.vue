<script setup lang="ts">
import {
  mdiSpiderWeb,
  mdiViewDashboard,
  mdiLogin,
  mdiListBoxOutline
} from '@mdi/js';
import { useUserStore } from '~~/store/user';
import { useNavigationStore } from '~~/store/navigation';

const userStore = useUserStore();
//console.log(userStore.getUser.data.userID)
const navigationStore = useNavigationStore();

const { width } = useWindowSize();

const config = useRuntimeConfig();

const displayBar = () => (width.value <= 400 ? true : false);

const oauth2Url = ref(config.public.discordOauth2Url);

const logout = async () => {
  console.log('logout');
  const { data } = await $fetch('/api/logout');
  console.log(data);
  userStore.reset();

  if (data && process.client) {
    console.log('重新整理');
    window.location.reload();
  }
};
</script>

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
              :src="`https://cdn.discordapp.com/avatars/${userStore.getUser.data.userID}/${userStore.getUser.data.userAvatar}`"
              :alt="
                userStore.getUser.data.userName
                  ? userStore.getUser.data.userName
                  : undefined
              "
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar>
              <v-img
                :src="`https://cdn.discordapp.com/avatars/${userStore.getUser.data.userID}/${userStore.getUser.data.userAvatar}.png`"
                :alt="
                  userStore.getUser.data.userName
                    ? userStore.getUser.data.userName
                    : undefined
                "
              ></v-img>
            </v-avatar>
            <h3>
              {{ userStore.getUser.data.userName }}
            </h3>
            <v-divider class="my-3"></v-divider>
            <v-btn @click="logout" rounded> logout </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.v-btn {
  margin-right: 30px;
}
</style>
