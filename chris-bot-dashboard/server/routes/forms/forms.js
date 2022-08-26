import { Router } from 'express';
import { formsController } from '../../controllers/formsController';

const router = Router();

router.post('/v1/forms/submit', formsController);

export default router;
