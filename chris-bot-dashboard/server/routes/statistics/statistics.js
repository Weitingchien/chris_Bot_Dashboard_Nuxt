import express from 'express';
import {
  collectionsNames,
  getAllDocuments
} from '../../controllers/statisticsController';

const router = express.Router();

router.get('/v1/yt/collectionsnames', collectionsNames);
router.get('/v1/yt/documents', getAllDocuments);

export default router;
