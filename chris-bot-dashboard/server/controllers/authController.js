export async function login(req, res, next) {
  const config = useRuntimeConfig();
  console.log(config);
  const url = `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`;

  res.redirect(url);
}

export async function redirect(req, res, next) {
  const { code } = req.query;
  res.status(200).json({ data: code });
  /*
  if (code) {
    try {
      console.log('auth');
      const config = useRuntimeConfig();
      const formData = new url.URLSearchParams({
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: `${config.public.apiBase}/api/v1/discord/redirect`
      });
      const response = await $fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: formData.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      res.status(200).json({
        status: 'success',
        data: response.data
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  }
  */
}
