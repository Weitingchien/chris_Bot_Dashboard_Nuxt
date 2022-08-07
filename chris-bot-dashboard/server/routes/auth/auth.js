import express from 'express';

import { redirect, logout } from '../../controllers/authController';
import { deserializeSession } from '../../utils/session';

const router = express.Router();

router.get('/logout', logout);
router.get('/v1/discord/auth', deserializeSession);
router.get('/v1/discord/redirect', redirect);

export default router;
