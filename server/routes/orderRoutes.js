import express from 'express';
import { addToUserOrder } from '../controllers/orderController.js'

const router = express.Router();

router.post('/add-to-order', addToUserOrder);

export default router;