import express from "express";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/cod", authUser, placeOrderCOD);      // POST /api/orders/cod
router.get("/user", authUser, getUserOrders);       // GET /api/orders/user
router.get("/seller", authSeller, getAllOrders);    // GET /api/orders/seller

export default router;
