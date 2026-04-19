import express from "express";
import { deleteAccount } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/delete-account-request", deleteAccount);

export default router;