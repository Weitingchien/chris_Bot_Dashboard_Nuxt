import express from 'express';
import discordStrategy from './strategies/discord';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import chrisbotdbConnections from './models/chrisbotDashboardModel';
import webCrawler from './routes/webCrawler';
import auth from './routes/auth/auth';
import statistics from './routes/statistics/statistics';
import forms from './routes/forms/forms';

const app = express();
const config = useRuntimeConfig();

discordStrategy();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.SECRET,
    store: MongoStore.create({
      client: chrisbotdbConnections.chrisbotDB.getClient()
    }),
    name: 'connectID',
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { maxAge: 600 * 1000 } // 10 minutes
    //cookie: { maxAge: 3600000 * 24 } // 1 day
    //cookie: { maxAge: 10000 } // 10 seconds
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(statistics);
app.use(webCrawler);
app.use(auth);
app.use(forms);

export default app;
