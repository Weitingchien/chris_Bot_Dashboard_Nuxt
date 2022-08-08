import express from 'express';
import { collectionsnames } from '../../controllers/statisticsController';

const router = express.Router();

router.get('/v1/yt/collectionsnames', collectionsnames);
router.get('/v1/yt/documents');

export default router;
