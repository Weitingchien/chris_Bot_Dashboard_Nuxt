import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    //components: true, // Auto import components
    css: ['vuetify/lib/styles/main.sass'], // Global css
     // Will register file from project server directory to handle /server-api/* requests
    serverMiddleware: [{ path: "/api", handler: "~/server/index.js" }],
    build: {
        transpile: ['vuetify'],
      },
      vite: {
        define: {
          'process.env.DEBUG': false,
        },
      },
      /*
      nitro: {
        plugins: [
            "~/server/index.js"
        ]
        
    },
    */
    //publicRuntimeConfig: {},
    privateRuntimeConfig: {
        MONGODBCONNECTIONSTRING: process.env.MONGODBCONNECTIONSTRING
    }
})
