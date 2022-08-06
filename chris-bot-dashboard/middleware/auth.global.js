import { useUserStore } from '~~/store/user';

export default defineNuxtRouteMiddleware(async to => {
  // Using SSR, that middleware is going to be called once from the server and once from the client
  // Prevent the middleware from being run on the server by using if(process.client)
  if (process.client) {
    const config = useRuntimeConfig();
    const { data, pending, refresh, error } = await useFetch(
      `${config.public.apiBase}/api/v1/discord/auth`
    );

    //console.log(error.value.response.status);
    //console.log(`data.value: ${data.value.data}`);
    //console.log(`error.value: ${error.value}`);

    // if path contain /auth/... and get error would redirect to home page.
    if (to.path.includes('auth')) {
      if (error.value) return navigateTo('/', { redirectCode: 301 });
    }
    if (data.value) {
      console.log('Frontend got user data!!!');
      console.log(data.value.data);
      const userStore = useUserStore();
      const parseUserData = JSON.parse(data.value.data[0]);
      parseUserData.userID = data.value.data[1];
      const newUserData = parseUserData;
      userStore.addUserData(newUserData);
    }
  }
});
