export function logout(req, res, next) {
  req.logout(err => {
    if (err) next(err);
    res.redirect('/');
  });
}

export async function isAuthorized(req, res, next) {
  if (req.user) {
    console.log('User is logged in');
    return res.status(200).json({
      status: 'success',
      data: {
        userID: req.user.userID,
        userAvatar: req.user.userAvatar,
        userName: req.user.userName
      }
    });
  }
  console.log('User is not logged in');
  return res.status(401).json({ status: 'fail', data: '尚未登入' });
}

/*
async function createOrUpdateUser(
  user,
  id,
  username,
  avatar,
  access_token,
  refresh_token
) {
  if (user.length) {
    console.log('Update user');
    const updateUser = await users.chrisbotDashboardUsers.findOneAndUpdate(
      { userID: id },
      { userID: id, userName: username, userAvatar: avatar },
      { new: true }
    );
    return updateUser;
  } else {
    console.log('Add user');
    const newUser = new users.chrisbotDashboardUsers({
      userID: id,
      userName: username,
      userAvatar: avatar,
      access_token: access_token,
      refresh_token: refresh_token
    });
    await newUser.save((err, user) => {
      if (err) return console.error(err);
    });
    return newUser;
  }
}

export async function redirect(req, res, next) {
  const { code } = req.query;

  if (code) {
    try {
      console.log('get access_token');
      const config = useRuntimeConfig();
      const formData = new URLSearchParams({
        client_id: config.public.CLIENT_ID,
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

      const { access_token, expires_in, refresh_token, token_type, scope } =
        response;

      const userResponse = await $fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${token_type} ${access_token}`
        }
      });

      const { id, username, avatar } = userResponse;
      const user = await users.chrisbotDashboardUsers.find({ userID: id });
      const newUser = await createOrUpdateUser(
        user,
        id,
        username,
        avatar,
        access_token,
        refresh_token
      );

      await serializeSession(req, newUser);
      return res.redirect('/');
      
      res.status(200).json({
        status: 'success',
        data: newUser
      });
      
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  }
}

export async function logout(req, res, next) {
  console.log('logout from back-end');
  req.session.destroy();
  console.log(req.session);
  res.clearCookie('connectID');
  res.status(200).json({ status: 'success', data: 'cookie deleted!' });
}
*/
