import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/order.js";
import Transaction from "../models/transaction.js";
import { stat } from "fs/promises";
// import items from 'razorpay/dist/types/items.js';

dotenv.config();

const createTransaction = async (req, res) => {
  const { amount, userId } = req.body;
console.log(amount),console.log(userId)
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: amount,
    currency: "INR",
    receipt: `receipt#${Date.now()}`,
  };

  try {
    
    if (!amount || !userId) {
      return res.status(400)({
        success: false,
        message: "Amount and userId required",
      });
    }
console.log(userId)
    const razorpayOrder = await razorpay.orders.create(options);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create order",
      error: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    deliveryDate,
    address,
    cartItems,
  } = req.body;

  const key_secret = process.env.RAZORPAY_SECRET;
console.log('res')
  const generate_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generate_signature === razorpay_signature) {
    console.log('res1')
    try {
      const transaction = await Transaction.create({
        user: userId,
        orderId: razorpay_order_id,
        status: "Success",
        amount: cartItems.reduce(
          (totalmem, item) => totalmem + item?.price * item?.quantity,
          0
        ), 

      });
console.log('res2')
      const order = await Order.create({
        userId: userId,
        address,
        deliveryDate,
        items: cartItems?.map((item) => ({
          product: item?._id,
          quantity: item?.quantity,
        })),
        status: "Order Placed",
      });
console.log('res3')
      transaction.order = order._id;
      await transaction.save();
      res.json({
        sucess: true,
        message: "Payment Verified and order created",
        order,
      });
    } catch (error) {console.log(error.message)
      res.status(500).json({
        status: "failed",
        message: "Failed to create transaction or order",
        error: error.message,
      });
    }
  }
};

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId })
      .populate("user", "name email")
      .populate("items.product", "name price image_uri ar_uri")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: err.message,
    });
  }
};

export { createTransaction, createOrder, getOrdersByUserId };
