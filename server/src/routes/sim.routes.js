import express from "express";
import { confirmPayment } from "../controllers/sim.controller.js";

const router = express.Router();

router.post("/confirm-payment", confirmPayment);

export default router;