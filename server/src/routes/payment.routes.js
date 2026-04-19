import express from "express";
import { createPaymentSheet } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/payment-sheet", createPaymentSheet);

export default router;