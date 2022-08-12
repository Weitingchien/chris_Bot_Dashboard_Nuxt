import passport from 'passport';
import { Strategy as discordStrategy } from 'passport-discord';
import users from '../models/chrisbotDashboardModel';

export default function () {
  console.log('執行discord strategy');
  function configure() {
    const config = useRuntimeConfig();
    return config;
  }

  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log(`id: ${id}`);
    console.log('deserializeUser');
    const user = await users.chrisbotDashboardUsers.findById(id);
    if (user)
      done(null, {
        userID: user.userID,
        userAvatar: user.userAvatar,
        userName: user.userName
      });
  });

  passport.use(
    new discordStrategy(
      {
        clientID: configure().public.CLIENT_ID,
        clientSecret: configure().CLIENT_SECRET,
        callbackURL: `${configure().public.apiBase}/api/v1/discord/redirect`,
        scope: ['identify']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await users.chrisbotDashboardUsers.findOne({
            userID: profile.id
          });
          const userData = {
            userID: profile.id,
            userName: profile.userName,
            userAvatar: profile.avatar,
            access_token: accessToken,
            refresh_token: refreshToken
          };
          if (user) {
            console.log('User exists!');
            await user.updateOne(userData);
            done(null, user);
          } else {
            console.log("User doesn't exist!");
            const newUser = await users.chrisbotDashboardUsers.create({
              userData
            });
            const saved = await newUser.save();
            return done(null, saved);
          }
        } catch (err) {
          console.log('有錯誤發生');
          console.log(err);
          return done(err, null);
        }
      }
    )
  );
}
