import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },

                name: String,
                price: Number,
                quantity: Number
            }
        ],

        totalAmount: {
            type: Number,
            required: true
        },

        paymentId: {
            type: String
        },

        orderStatus: {
            type: String,
            default: "Placed"
        },
        image: {
            type : String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);