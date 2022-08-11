import express from 'express';
import { formsController } from '../../controllers/formsController';

const router = express.Router();

router.post('/v1/forms/submit', formsController);

export default router;
