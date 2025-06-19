import express from 'express';
import { register, login, getProfile, deleteProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getProfile);
router.delete('/profile', deleteProfile);

export default router;
