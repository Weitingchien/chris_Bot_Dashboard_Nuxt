import express from 'express';
import mongoDBConnect from './config/mongodb';
import webCrawler from './routes/webCrawler';
import auth from './routes/auth/auth';
import cors from 'cors';

const app = express();
app.use(cors());

//const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDBConnect();
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

app.use(webCrawler);
app.use(auth);

//app.listen(PORT, () => console.log(`Running on port: ${PORT}`));

export default app;
