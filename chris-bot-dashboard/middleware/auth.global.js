import { useUserStore } from '~~/store/user';

export default defineNuxtRouteMiddleware(async to => {
  // Using SSR, that middleware is going to be called once from the server and once from the client
  // Prevent the middleware from being run on the server by using if(process.client)
  if (process.client) {
    const config = useRuntimeConfig();
    const { data, pending, refresh, error } = await useFetch(
      '/api/v1/discord/auth'
    );

    // if path contain /auth/... and get error would redirect to login page.

    if (to.path.includes('auth')) {
      if (error.value) {
        return externalRedirect(config.public.discordOauth2Url, 301);
      }
    }

    if (data.value) {
      const userStore = useUserStore();
      const newUserData = data.value.data;
      userStore.addUserData(newUserData);
    }
  }
});
