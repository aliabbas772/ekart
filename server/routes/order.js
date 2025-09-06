import express from "express";
import { createTransaction, createOrder, getOrdersByUserId } from "../controllers/order.js"

const router = express.Router();

router.post("/transaction", createTransaction)
router.post("/:userId", getOrdersByUserId)
router.post("/", createOrder)

export default router;