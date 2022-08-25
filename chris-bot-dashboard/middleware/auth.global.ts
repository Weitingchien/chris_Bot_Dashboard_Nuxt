import { useUserStore } from '~~/store/user';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Using SSR, that middleware is going to be called once from the server and once from the client
  // Prevent the middleware from being run on the server by using if(process.client)
  if (process.client) {
    const config = useRuntimeConfig();
    const user = await userAuth();

    if (to.path.includes('auth')) {
      if (!user) {
        return externalRedirect(config.public.discordOauth2Url);
      }
    }

    if (user) {
      const userStore = useUserStore();
      userStore.addUserData(user.data);
    }
  }
});
