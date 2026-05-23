import { useState } from "react";
import "../styles/Login.css";
import { signupCustomer } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {

    const [formData, setformData] = useState({

        name: "",
        email: "",
        password: "",
        phone: "",

        address: {
            city: "",
            state: "",
            country: "",
            zipCode: ""
        }

    });

    // const [error, seterror] = useState("");
    const navigate = useNavigate();
    const addressFields = ["city", "state", "country", "zipCode"];


    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (addressFields.includes(name)) {
            setformData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            })
            )
        }
        else {
            setformData(prev => ({
                ...prev,
                [name]: value
            })
            )
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.name === "") {
            toast.error("name field cannot be empty");
            return;
        }
        if (formData.email === "") {
            toast.error("email field cannot be empty");
            return;

        }
        if (formData.password.length < 6) {
            toast.error("password field must contain atleast 6 characters");
            return;

        }
        if (!formData.email.includes("@")) {
            toast.error("Invalid email");
            return;

        };
        const response = await signupCustomer(formData);
        if (response) {
            console.log("Response : ", response);
            toast.success("sign up success");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            navigate("/login");
        }
    }

    return (

        <div className="register-page">

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <h2 className="register-title">
                    Signup
                </h2>


                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="register-input"
                    value={formData.name}
                    onChange={handleChange}
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="register-input"
                    value={formData.email}
                    onChange={handleChange}
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="register-input"
                    value={formData.password}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    className="register-input"
                    value={formData.phone}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    className="register-input"
                    value={formData.address.city}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    className="register-input"
                    value={formData.address.state}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="country"
                    placeholder="Enter country"
                    className="register-input"
                    value={formData.address.country}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="zipCode"
                    placeholder="Enter zip code"
                    className="register-input"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="register-btn"
                >
                    Signup
                </button>

                <p>
                    Already have an account?
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>

    )

}

export default Signup;