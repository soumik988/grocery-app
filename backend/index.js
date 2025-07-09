import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import { connectCLoudinary } from './config/cloudinary.js';

// Load environment variables
dotenv.config();

// Route imports
import userRoutes from './Routes/user.routes.js';
import sellerRoutes from "./Routes/seller.routes.js";
import productRoutes from "./Routes/product.routes.js";
import orderRoutes from "./Routes/order.routes.js";
import cartRoutes from "./Routes/cart.routes.js";
import addressRoutes from "./Routes/address.routes.js";

// Initialize Express
const app = express();

// Connect to MongoDB and Cloudinary
connectDB();
connectCLoudinary();

// Allowed frontend origins
const allowedOrigins = ["http://localhost:5173"];

// Middleware
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use("/images", express.static("uploads")); // Static file access for product images

// API routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);

// ✅ FIXED: Mount the order route with 'orders' (plural)
app.use("/api/orders", orderRoutes); // Now matches /api/orders/user

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
