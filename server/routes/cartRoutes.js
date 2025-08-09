import express from 'express';
import { getUserCart, getUserCartTotal, addToUserCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getUserCart);
router.get('/total/:userId', getUserCartTotal);
router.post('/add-to-cart', addToUserCart);

export default router;