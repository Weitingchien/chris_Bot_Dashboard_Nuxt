import express from 'express';
import mongoDBConnect from './config/mongodb';
import webCrawler from './routes/webCrawler';
//const mongoDBConnect = require('./config/mongodb');
//const webCrawler = require('./routes/webCrawler');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoDBConnect();
/*
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});
*/

app.use(webCrawler);

export default app;
