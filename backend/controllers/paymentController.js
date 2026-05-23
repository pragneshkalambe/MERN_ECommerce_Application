import Razorpay from "razorpay";


// create order
export const createOrder = async (req, res) => {

    try {

        console.log(process.env.RAZORPAY_KEY_ID);

        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order =
            await razorpayInstance.orders.create(options);

        res.status(200).json(order);

    } catch (error) {

        console.log(
            "error creating order:",
            error.message
        );

        res.status(500).json({
            message: "payment order failed",
            error: error.message
        });

    }

};