import express from 'express';
import {handleSignUp,handleLogin,handleVerify, handleUpdatePassword} from '../controllers/user.js'


const router =express.Router();

router.post('/signup',handleSignUp);

router.post('/login',handleLogin);

router.post('/update',handleUpdatePassword);

router.get('/verify',handleVerify);

export default router;