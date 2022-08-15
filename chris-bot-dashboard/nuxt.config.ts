import { defineNuxtConfig } from 'nuxt'
import { globalSettings } from './environmentsettings'

const appEnv = process.env.ENV || 'development'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app:{
      head:{
        title: 'lexi-Dashboard',
        meta:[{ charset: 'utf-8' },{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        link: [
          {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
          {rel: 'icon', sizes: '32x32', href: '/android-chrome-192x192.png'},
          {rel: 'icon', sizes: '32x32', href: '/android-chrome-512x512.png'},
          {rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png'},
          {rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png'},
          {rel: 'manifest', href: '/site.webmanifest'}
        ],
      },
    },
    //components: true, // Auto import components
    css: ['vuetify/lib/styles/main.sass'], // Global css
    modules: ['@vueuse/nuxt',['@pinia/nuxt']],
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
        MONGODBCONNECTIONSTRINGYTCHANNEL: process.env.MONGODBCONNECTIONSTRINGYTCHANNEL, // can be overridden by NUXT_API_SECRET environment variable
        MONGODBCONNECTIONSTRINGCHRISBOTDB: process.env.MONGODBCONNECTIONSTRINGCHRISBOTDB,
        CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
        SECRET: process.env.SECRET,
        public: {
          discordRedirectAPI: globalSettings[appEnv].discordRedirectAPI,
          discordOauth2Url: globalSettings[appEnv].discordOauth2Url,
          CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        }
      },
      /*
      server: {
        port: 3000,
        host: '0.0.0.0'
      }
      */
      /*
      nitro: {
        plugins: [
            "~/server/index.js"
        ]
        
    },
    */
    //publicRuntimeConfig: {},
})
