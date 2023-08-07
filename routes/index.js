import express from 'express';
import auth from './auth'
import prod from './products'
import order from './orders'
import admin from './admin'
import {verifyAdmin} from '../middlewares/verifyAdmin';
import { authenticateToken } from '../middlewares/authenticateToken';
const router = express.Router();
router.use('/prod', prod);
router.use('/auth',auth);
router.use('/order',authenticateToken,order)
router.use('/admin',verifyAdmin,admin)
export default router;