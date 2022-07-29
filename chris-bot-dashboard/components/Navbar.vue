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
    <v-btn icon placeholder="Login">
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

const drawer = ref(false);

const displayBar = () => (width.value <= 400 ? true : false);

const displayList = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped>
.v-btn {
  margin-right: 30px;
}
</style>
