import Customer from '../models/Customer.js';
import jwt from 'jsonwebtoken';


export const signupCustomer = async (req, res) => {
    try {
        const {
            name, email, password, phone, address
        } = req.body;

        //check if user already exist
        let userExists = await Customer.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        };
        const newCustomer = new Customer(
            {
                name,
                email,
                password,
                phone,
                address
            }
        );
        await newCustomer.save();
        console.log("new customer :",newCustomer );
        return res.status(201).json({
            message: "success",
            customer: newCustomer
        });

    } catch (error) {
        console.log("error signing up customer : ", error.message);
        return res.status(500).json({
            message: "signup failed",
            reason: error.message
        });
    }
}

export const loginCustomer = async (req, res) => {
    try {
        const {
            email, password
        } = req.body;

        //check if user already exist
        let userExists = await Customer.findOne({ email: email });
        if (!userExists) {
            return res.status(404).json({ message: "User doesn't exists" });
        };

        let matchedPassword = await userExists.comparePassword(password);
        if (!matchedPassword) {
            return res.status(401).json({ message: "password invalid" });
        }

        //generate jwt
        let payload = {
            customerId : userExists._id,
            email : userExists.email
        }

        let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "1h"});
        console.log("token:",token);

        return res.status(200).json(
            {
                message : "Login successfull",
                token,
                customer : {
                    id : userExists._id,
                    name : userExists.name,
                    email : userExists.email,
                    role : userExists.role
                }
            }
        )

    } catch (error) {
        console.log("error logging in customer: : ", error.message);
        return res.status(500).json({
            message: "login failed",
            reason: error.message
        });
    }
}