<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      v-show="displayBar()"
      @click="displayList"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn to="/" icon placeholder="Dashboard">
      <v-icon> {{ mdiViewDashboard }} </v-icon>
    </v-btn>
    <v-btn to="/webcrawler" icon placeholder="SpiderWeb">
      <v-icon>{{ mdiSpiderWeb }}</v-icon>
    </v-btn>
    <v-btn icon placeholder="Login" @click="login">
      <v-icon>{{ mdiLogin }}</v-icon>
    </v-btn>
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
      <v-list-item :prepend-icon="mdiLogin" title="Login" value="Login">
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { mdiSpiderWeb, mdiViewDashboard, mdiLogin } from '@mdi/js';

const { width } = useWindowSize();

const config = useRuntimeConfig();

const drawer = ref(false);

const displayBar = () => (width.value <= 400 ? true : false);

const displayList = () => {
  drawer.value = !drawer.value;
};

const login = async () => {
  await $fetch(`${config.public.apiBase}/api/v1/discord/login`);
  //const router = useRouter();

  /*
  await $fetch(
    `https://discord.com/api/oauth2/authorize?client_id=1003790898737447025&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`
  );
  */
  //const code = await $fetch(`${config.public.apiBase}/api/v1/discord/redirect`);
  /*
  return await $fetch(
    'https://discord.com/api/oauth2/authorize?client_id=1003790898737447025&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify',
    {
      method: 'POST',
      body: {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${config.public.apiBase}/`
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  */
};
//console.log(login);
</script>

<style scoped>
.v-btn {
  margin-right: 30px;
}
</style>
