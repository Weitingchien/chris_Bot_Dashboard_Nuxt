<template>
  <v-app-bar></v-app-bar>
  <v-navigation-drawer permanent>
    <v-list density="compact" nav>
      <v-list-item
        to="/"
        :prepend-icon="mdiViewDashboard"
        title="Home"
        value="Home"
      >
        <!--<nuxt-link to="/">Home</nuxt-link>-->
      </v-list-item>
      <v-list-item
        to="/webcrawler"
        value="Web Crawler"
        title="Web Crawler"
        :prepend-icon="mdiSpiderWeb"
      >
      </v-list-item>
      <v-list-item
        :prepend-icon="mdiLogin"
        title="Login"
        value="Login"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { mdiSpiderWeb, mdiViewDashboard, mdiLogin } from '@mdi/js';
</script>
