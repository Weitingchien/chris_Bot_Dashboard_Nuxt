import express from 'express';
import mongoDBConnect from './config/mongodb';
import webCrawler from './routes/webCrawler';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoDBConnect();
app.use(webCrawler);

export default app;
