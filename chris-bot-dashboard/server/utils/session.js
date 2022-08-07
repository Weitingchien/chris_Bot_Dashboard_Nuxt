import cookieParser from 'cookie-parser';
import users from '../models/chrisbotDashboardModel';

export async function serializeSession(req, user) {
  console.log(`serializeSession's userName: ${user.userName}`);
  req.user = user;
  req.session.user = user.userID;
  const userSession = await users.chrisbotDashboardSession.findOne({
    userID: user.userID
  });
  console.log(`userSession: ${userSession}`);
  const sessionData = {
    sessionID: req.sessionID,
    userID: user.userID,
    data: JSON.stringify({
      userName: user.userName,
      userAvatar: user.userAvatar
    }),
    expiresAt: req.session.cookie.expires
  };
  if (!userSession) {
    const session = new users.chrisbotDashboardSession(sessionData);
    session.save();
  } else {
    console.log('updateSession');
    const updateUser = await users.chrisbotDashboardSession.findOneAndUpdate(
      { userID: user.userID },
      sessionData,
      { new: true }
    );
    console.log(`updateUser: ${updateUser}`);
  }
}

export async function deserializeSession(req, res, next) {
  const config = useRuntimeConfig();
  const { connectID } = req.cookies;
  console.log(`connectID: ${connectID}`);
  if (!connectID) {
    return res.status(401).json({ status: 'fail', message: 'No session' });
  }

  const sessionIDFromClient = cookieParser
    .signedCookie(connectID, config.SECRET)
    .toString();
  console.log(`sessionIDFromClient: ${sessionIDFromClient}`);

  const sessionFromDB = await users.chrisbotDashboardSession.findOne({
    sessionID: sessionIDFromClient
  });

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
    const { data, userID } = sessionFromDB;
    return res.status(200).json({
      status: 'success',
      message: 'Authenticated',
      data: [data, userID]
    });
  }
  /*
  console.log(`currentTime: ${currentTime}`);
  console.log(`expiresAt: ${req.session.cookie.expires}`);
  */
}
