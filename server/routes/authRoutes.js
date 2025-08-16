import express from 'express';
import { registerUser, loginUser, logoutUser, authRequired, me } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', authRequired, me);


export default router;