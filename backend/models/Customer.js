import mongoose from "mongoose";
import bcrypt from "bcrypt";


const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String
    },

    address: {

        city: {
            type: String
        },

        state: {
            type: String
        },

        country: {
            type: String
        },

        zipCode: {
            type: String
        }

    },
    role: {
        type: String,
        default: "customer"
    }

},
    {
        timestamps: true
    });


// HASH PASSWORD BEFORE SAVE
customerSchema.pre("save", async function () {

    // prevent rehashing
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(
        this.password,
        salt
    );

});

// COMPARE PASSWORD METHOD
customerSchema.methods.comparePassword =
    async function (candidatePassword) {

        return bcrypt.compare(
            candidatePassword,
            this.password
        );

    };


const Customer =
    mongoose.model("Customer", customerSchema);

export default Customer;