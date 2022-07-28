import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg';

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: true,
          variables: {}
        }
      }
    },
    components,
    directives
  });

  nuxtApp.vueApp.use(vuetify);
});
