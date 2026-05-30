// configure env
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import paymentRoutes
from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes
from "./routes/adminRoutes.js";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");
const app = express();


// middleware
app.use(cors());
app.use(express.json());


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// serve uploaded images
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(uploadDir));




// routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/orders", orderRoutes);   
app.use("/api/admin",adminRoutes);

// connect database
mongoose.connect(process.env.MONGO_CONNECT)
    .then(() =>
        console.log("MongoDB connected")
    )
    .catch(err =>
        console.log(err.message)
    );


// server
const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});