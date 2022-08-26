import { Router } from 'express';
import {
  collectionsNames,
  getAllDocuments
} from '../../controllers/statisticsController';

const router = Router();

router.get('/v1/yt/collectionsnames', collectionsNames);
router.get('/v1/yt/documents', getAllDocuments);

export default router;
