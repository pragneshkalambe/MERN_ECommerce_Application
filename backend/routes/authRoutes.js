import express from "express";
const router = express.Router();

import { signupCustomer,loginCustomer } from '../controllers/authController.js';

router.post("/signup",signupCustomer);
router.post("/login",loginCustomer);

export default router;