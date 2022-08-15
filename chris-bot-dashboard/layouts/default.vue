<template>
  <v-app>
    <v-layout>
      <Navigation />
      <Appbar />
      <v-main>
        <v-container fluid>
          <NuxtPage />
        </v-container>
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
      <Footer />
    </v-layout>
  </v-app>
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
  z-index: 1;
  position: fixed;
  bottom: 40px;
  right: 0;
}

.v-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
