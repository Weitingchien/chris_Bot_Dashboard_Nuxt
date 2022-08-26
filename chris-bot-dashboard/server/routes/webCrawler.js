import { Router } from 'express';
import { channelController } from '../controllers/channelController';
const router = Router();

router.get('/webcrawler/all', channelController);

export default router;
