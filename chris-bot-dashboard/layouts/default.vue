<template>
  <v-layout>
    <Navbar />
    <v-main>
      <!--<NuxtPage />-->
      <NuxtChild />
    </v-main>
    <v-btn
      @click="toggleTheme"
      class="toggletheme"
      variant="outlined"
      size="large"
      :icon="mdiPencil"
      color="info"
    >
    </v-btn>
  </v-layout>
</template>

<script setup>
import { mdiPencil } from '@mdi/js';
import { useTheme } from 'vuetify';
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>

<style scoped>
.toggletheme {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
