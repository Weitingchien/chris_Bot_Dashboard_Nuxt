export function logout(req, res, next) {
  req.logout(err => {
    if (err) next(err);
    res.status(200).json({ status: 'success', data: 'logout success' });
    //res.redirect('/');
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
