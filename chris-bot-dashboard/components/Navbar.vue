<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      v-show="displayBar()"
      @click="displayList"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn v-show="!displayBar()" to="/" icon placeholder="Dashboard">
      <v-icon> {{ mdiViewDashboard }} </v-icon>
    </v-btn>
    <v-btn v-show="!displayBar()" to="/webcrawler" icon placeholder="SpiderWeb">
      <v-icon>{{ mdiSpiderWeb }}</v-icon>
    </v-btn>
    <v-btn v-show="!displayBar()" to="/auth/form" icon placeholder="Form">
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
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list dense nav>
      <v-list-item
        to="/"
        :prepend-icon="mdiViewDashboard"
        title="Home"
        value="Home"
      >
      </v-list-item>
      <v-list-item
        to="/webcrawler"
        value="Web Crawler"
        title="Web Crawler"
        :prepend-icon="mdiSpiderWeb"
      >
      </v-list-item>
      <v-list-item
        to="/auth/form"
        value="Form"
        title="Form"
        :prepend-icon="mdiListBoxOutline"
      >
      </v-list-item>
      <v-list-item
        v-if="!userStore.getLoginStatus"
        :href="oauth2Url"
        :prepend-icon="mdiLogin"
        title="Login"
        value="Login"
      >
      </v-list-item>
      <!--https://cdn.discordapp.com/avatars/user_id/user_avatar.png-->
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import {
  mdiSpiderWeb,
  mdiViewDashboard,
  mdiLogin,
  mdiListBoxOutline
} from '@mdi/js';
import { useUserStore } from '~~/store/user.js';

const userStore = useUserStore();

const { width } = useWindowSize();

const config = useRuntimeConfig();

const drawer = ref(false);

const displayBar = () => (width.value <= 400 ? true : false);

const displayList = () => {
  drawer.value = !drawer.value;
};

const oauth2Url = ref(
  `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`
);

const logout = async () => {
  console.log('logout');
  console.log(config.public.apiBase);

  const { data } = await useFetch(`${config.public.apiBase}/api/logout`);
  userStore.reset();
  const route = useRoute();

  console.log(data.value);
  if (data.value) {
    console.log(`Route fullPath: ${route.fullPath}`);
    window.location.reload(true);
  }
};
</script>

<style scoped>
.v-btn {
  margin-right: 30px;
}
</style>
