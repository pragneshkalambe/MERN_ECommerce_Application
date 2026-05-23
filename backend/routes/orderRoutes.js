import express from "express";

import {
    createOrder,
    getCustomerOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/:customerId", getCustomerOrders);

export default router;