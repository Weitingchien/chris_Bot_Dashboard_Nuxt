import { useUserStore } from '~~/store/user';

export default defineNuxtRouteMiddleware(async to => {
  // Using SSR, that middleware is going to be called once from the server and once from the client
  // Prevent the middleware from being run on the server by using if(process.client)
  if (process.client) {
    const config = useRuntimeConfig();
    const { data, pending, refresh, error } = await useFetch(
      '/api/v1/discord/auth'
    );

    // if path contain /auth/... and get error would redirect to home page.

    if (to.path.includes('auth')) {
      if (error.value) {
        return externalRedirect(
          `https://discord.com/api/oauth2/authorize?client_id=${config.public.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`,
          301
        );
      }
    }

    if (data.value) {
      console.log(data);
      const userStore = useUserStore();
      const newUserData = data.value.data;
      userStore.addUserData(newUserData);
    }
  }
});
