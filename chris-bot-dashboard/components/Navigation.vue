<template>
  <v-navigation-drawer
    v-model="navigationStore.$state.drawer"
    absolute
    temporary
    app
  >
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
import { useNavigationStore } from '@/store/navigation';

const userStore = useUserStore();
const navigationStore = useNavigationStore();

const config = useRuntimeConfig();

const oauth2Url = ref(config.public.discordOauth2Url);
</script>
