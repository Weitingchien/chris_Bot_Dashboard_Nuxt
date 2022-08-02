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

app.use(webCrawler);
app.use(auth);

//app.listen(PORT, () => console.log(`Running on port: ${PORT}`));

export default app;
