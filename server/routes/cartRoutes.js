import express from 'express';
import { getUserCart, getUserCartTotal, addToUserCart } from '../controllers/cartController.js';
import { authRequired } from '../controllers/authController.js';

const router = express.Router();

router.get('/', authRequired, getUserCart);
router.get('/total', getUserCartTotal);
router.post('/add', addToUserCart);

export default router;