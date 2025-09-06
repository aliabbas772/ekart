import express from "express";
import { getProductsBycategoryId } from "../controllers/product.js";

const router = express.Router();

router.get("/:categoryId", getProductsBycategoryId)

export default router;