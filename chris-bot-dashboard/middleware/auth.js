export default defineNuxtRouteMiddleware(async to => {
  console.log(to);
  // Using SSR, that middleware is going to be called once from the server and once from the client
  // Prevent the middleware from being run on the server by using if(process.client)
  if (process.client) {
    const config = useRuntimeConfig();
    const { data, pending, refresh, error } = await useFetch(
      `${config.public.apiBase}/api/v1/discord/auth`
    );

    //console.log(error.value.response.status);
    console.log(data.value);
    console.log(error.value);

    if (error.value) return navigateTo('/');
  }
});
