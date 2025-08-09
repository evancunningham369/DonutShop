import express from 'express';
import { handleGetAllDonuts } from '../controllers/donutController.js';

const router = express.Router();

router.get('/:userId', handleGetAllDonuts);

export default router;