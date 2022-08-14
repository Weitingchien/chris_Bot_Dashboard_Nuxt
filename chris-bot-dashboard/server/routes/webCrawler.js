//const express = require('express');
import express from 'express';
import { channelController } from '../controllers/channelController';
const router = express.Router();

router.get('/webcrawler/all', channelController);

export default router;
