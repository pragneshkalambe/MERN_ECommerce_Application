import { useState, useContext } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {

    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // });

    // function handleChange(event) {

    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value
    //     });

    // }

    // function handleSubmit(event) {
    //     event.preventDefault();

    //     console.log("submitted data:", formData);

    //     // later:
    //     // call register API here
    // }


    //destructuring data from useContext;
    const { login } = useContext(AuthContext);

    const [formData, setformData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    // const [error, seterror] = useState("");

    const handleSubmit = async (event) => {
        // seterror("");
        //prevent page refresh
        event.preventDefault();
        // const name = event.target.name;
        // const value = event.target.value;
        console.log(`email : ${formData.email} , password : ${formData.password}`);
        if (formData.email === "") {
            // seterror("Email field must not be empty");
            toast.error("Email field must not be empty");

            return;
        }
        if (formData.password.length < 6) {
            toast.error("password field must contain atleast 6 characters");
            return;

        }
        console.log("form data:", formData);
        let response = await loginCustomer(formData);

        if (response.token) {
            // localStorage.setItem("token",response.token);
            login(response.token, response.customer);
            toast.success("Login Successfull!!");

            if (
                response.customer.role === "admin"
            ) {

                navigate(
                    "/admin/dashboard"
                );

            } else {

                navigate("/");

            }
        }
    };

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log(`name : ${name} , values : ${value}`);
        setformData(values => (
            {
                ...values,
                [name]: value
            }
        ))
    };

    return (
        <div className="register-page">

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <h2 className="register-title">
                    Login
                </h2>

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

                <button
                    type="submit"
                    className="register-btn"
                >
                    Login
                </button>

                <p>
                    Don't have an account?
                    <Link to="/signup">
                        Signup
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;