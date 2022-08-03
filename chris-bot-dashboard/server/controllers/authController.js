export async function login(req, res, next) {
  const config = useRuntimeConfig();

  res.status(200).json({ status: 'success' });
  //const url = `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`;

  //res.redirect(url);
}

export async function redirect(req, res, next) {
  const { code } = req.query;
  //res.status(200).json({ data: code });

  if (code) {
    try {
      console.log('auth');
      const config = useRuntimeConfig();
      const formData = new URLSearchParams({
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${config.public.apiBase}/api/v1/discord/redirect`
      });
      const response = await $fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: formData.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      //console.log(response);
      const { access_token, expires_in, refresh_token, token_type, scope } =
        response;
      const userResponse = await $fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${token_type} ${access_token}`
        }
      });
      console.log(userResponse);

      res.status(200).json({
        status: 'success'
        //data: userResponse
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  }
}
