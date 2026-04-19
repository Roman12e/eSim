import express from "express";
import { getProductsController, getRegionsController } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/get-products", getProductsController);
router.get("/get-regions", getRegionsController);

export default router;