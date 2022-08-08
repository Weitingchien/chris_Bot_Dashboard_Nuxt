import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import webCrawler from './routes/webCrawler';
import auth from './routes/auth/auth';
import statistics from './routes/statistics/statistics';

const app = express();
const config = useRuntimeConfig();

app.use(
  session({
    secret: config.SECRET,
    name: 'connectID',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600 * 1000 } // 10 minutes
    //cookie: { maxAge: 3600000 * 24 } // 1 day
    //cookie: { maxAge: 10000 } // 10 seconds
  })
);

//const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//mongoDBConnect();
/*
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});
*/
//app.use(deserializeSession);
app.use(statistics);
app.use(webCrawler);
app.use(auth);

//app.listen(PORT, () => console.log(`Running on port: ${PORT}`));

export default app;
