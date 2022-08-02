import express from 'express';

import { redirect, login } from '../../controllers/authController';

const router = express.Router();

router.get('/v1/discord/login', login);
router.get('/v1/discord/redirect', redirect);

export default router;
