import cookieParser from 'cookie-parser';
import users from '../models/chrisbotDashboardModel';

export async function serializeSession(req, user) {
  req.user = user;
  req.session.user = user.userID;
  const session = new users.chrisbotDashboardSession({
    sessionID: req.sessionID,
    data: JSON.stringify({
      userID: user.userID,
      userName: user.userName,
      userAvatar: user.userAvatar
    }),
    expiresAt: req.session.cookie.expires
  });
  session.save();
}

export async function deserializeSession(req, res, next) {
  const config = useRuntimeConfig();
  const { connectID } = req.cookies;
  console.log(`connectID: ${connectID}`);
  if (!connectID) {
    return res.status(401).json({ status: 'fail', message: 'No session' });
  }
  console.log('continue!');
  const sessionIDFromClient = cookieParser
    .signedCookie(connectID, config.SECRET)
    .toString();
  console.log(`sessionIDFromClient: ${sessionIDFromClient}`);
  const sessionFromDB = await users.chrisbotDashboardSession.findOne({
    sessionID: sessionIDFromClient
  });
  console.log(`sessionFromDB: ${sessionFromDB}`);
  if (!sessionFromDB) {
    return res.status(401).json({ status: 'fail', message: 'Invalid session' });
  }
  const currentTime = new Date();
  if (sessionFromDB.expiresAt < currentTime) {
    await users.chrisbotDashboardSession.deleteOne(sessionFromDB);
    console.log('Session Deleted');
    return res.status(401).json({ status: 'fail', message: 'Session Expired' });
  } else {
    console.log('Session Not Expired');
    return res.status(200).json({ status: 'success', message: 'Authorized' });
  }
  /*
  console.log(`currentTime: ${currentTime}`);
  console.log(`expiresAt: ${req.session.cookie.expires}`);
  */
}
