import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        //receive customerid,cartitems,totalAmount,paymentId
        const {
            customerId,
            cartItems,
            totalAmount,
            paymentId
        } = req.body;

        //create order
        const newOrder = await Order.create({
            customerId,
            products : cartItems,
            paymentId,
            totalAmount
        });

        res.status(200).json({
            message: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        console.log("error creating order :", error.message);
        res.status(500).json({
            message: "Order creation failed",
            reason: error.message
        });

    }

}

export const getCustomerOrders = async (req, res) => {
    try {
        const { customerId } = req.params;

const customerOrders = await Order.find({
    customerId: customerId
}).sort({createdAt :-1});
        if (customerOrders) {
             res.status(200).json(customerOrders);
        };
    } catch (error) {
        console.log(error.message);
         res.status(500).json({
            error: error.message
        });

    }


}