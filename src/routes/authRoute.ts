import express from 'express'
import { forgetPassword, Login, resetPassword, signUp, VerifyEmail } from '../controllers/authController';
const router = express.Router();

router.post('/signup', signUp)
router.post('/login', Login)
router.get('/verify',VerifyEmail)
router.post('/forget-password', forgetPassword)
router.post('/reset-password',resetPassword)
export default router;
