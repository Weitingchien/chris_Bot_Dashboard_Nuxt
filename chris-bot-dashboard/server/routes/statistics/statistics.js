import express from 'express';
import {
  collectionsnames,
  getAllDocuments
} from '../../controllers/statisticsController';

const router = express.Router();

router.get('/v1/yt/collectionsnames', collectionsnames);
router.get('/v1/yt/documents', getAllDocuments);

export default router;
