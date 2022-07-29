import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    //components: true, // Auto import components
    css: ['vuetify/lib/styles/main.sass'], // Global css
    modules: [
      '@vueuse/nuxt',
    ],
     // Will register file from project server directory to handle /server-api/* requests
    serverMiddleware: [{ path: "/api", handler: "~/server/index.js" }], // ex: In frontend : /api/webcrawler/all
    build: {
        transpile: ['vuetify'],
      },
      vite: {
        define: {
          'process.env.DEBUG': false,
        },
      },
      runtimeConfig: {
        MONGODBCONNECTIONSTRING: process.env.MONGODBCONNECTIONSTRING, // can be overridden by NUXT_API_SECRET environment variable
        public: {
          apiBase: process.env.NUXT_PUBLIC_API_BASE, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
        }
      }
      /*
      nitro: {
        plugins: [
            "~/server/index.js"
        ]
        
    },
    */
    //publicRuntimeConfig: {},
    /*
    privateRuntimeConfig: {
        MONGODBCONNECTIONSTRING: process.env.MONGODBCONNECTIONSTRING
    }
    */
})
