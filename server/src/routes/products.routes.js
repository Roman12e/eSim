import express from "express";
import { getProductsController, getRegionsController, getSimCardDetailController } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/get-products", getProductsController);
router.get("/get-regions", getRegionsController);
router.post("/get-simcard-detail", getSimCardDetailController);

export default router;