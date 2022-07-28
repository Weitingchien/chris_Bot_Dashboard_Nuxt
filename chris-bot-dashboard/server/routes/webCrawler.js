import express from 'express';
import { getAllChannels } from '../controllers/channelController';
const router = express.Router();

//router.get('/webcrawler/:channel', getAllChannels);
router.get('/webcrawler/all', getAllChannels);

export default router;
