import mongoose from "mongoose";


// create schema
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ["mobile", "laptop"]
    },

    description: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    cellularData: {

        type: String,

        required: function () {
            return this.category === "mobile";
        },

        validate: {

            validator: function (value) {

                if (this.category !== "mobile" && value) {
                    return false;
                }

                return true;
            },

            message: "cellularData is allowed only for mobile products"

        }

    },

    images: {
        type: [String],
        default: []
    }

});


const Product = mongoose.model("Product", productSchema);

export default Product;