import express from 'express';
import passport from 'passport';
import { logout, isAuthorized } from '../../controllers/authController';

const router = express.Router();

router.get('/logout', logout);
router.get('/v1/discord/auth', isAuthorized);

router.get(
  '/v1/discord/redirect',
  passport.authenticate('discord', { successRedirect: '/' })
);

export default router;
