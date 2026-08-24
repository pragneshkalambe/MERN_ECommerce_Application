import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Checkout.css";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";


function Checkout() {

    const { cartItems ,ClearCart} = useContext(CartContext);
    // const { customer } = useContext(AuthContext);
    const navigate = useNavigate();


    const subtotal = cartItems.reduce(
        (acc, item) =>
            acc + (item.price * item.quantity),
        0
    );

    const handlePayment = async () => {

        try {

            // create razorpay order
            const response = await fetch(
                "https://mern-ecommerce-application-t0c8.onrender.com/api/payment/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: subtotal
                    })
                }
            );

            const order = await response.json();

            console.log("order in checkout:", order);

            // razorpay options
            const options = {
                key: "rzp_test_S64Omg722vFkSO",

                amount: order.amount,

                currency: order.currency,

                name: "ShopEase",

                description: "Order Payment",

                order_id: order.id,

                handler: async function (response) {

                    console.log(
                        "payment success:",
                        response
                    );

                    try {

                        const customer =
                            JSON.parse(
                                localStorage.getItem("customer")
                            );

                        const orderData = {
                            customerId: customer.id,

                            cartItems: cartItems.map(item => ({
                                productId: item._id,
                                name: item.name,
                                price: item.price,
                                quantity: item.quantity,
                                image : item.images?.[0]
                            })),

                            totalAmount: subtotal,

                            paymentId:
                                response.razorpay_payment_id
                        };

                        const createdOrder =
                            await createOrder(orderData);

                        console.log(
                            "created order:",
                            createdOrder
                        );
                        ClearCart();
                        // localStorage.removeItem("cart");
                       
                        navigate("/orders");

                    } catch (error) {

                        console.log(
                            "order creation error:",
                            error.message
                        );

                    }

                },

                prefill: {
                    name: "Pragnesh",
                    email: "test@gmail.com"
                },

                theme: {
                    color: "#2563eb"
                }
            };

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.log(
                "payment error:",
                error.message
            );

        }

    };

    return (
        <div className="checkout-container">

            <h1 className="checkout-title">
                Checkout
            </h1>

            <div className="checkout-wrapper">

                <div className="checkout-items">

                    {cartItems.map(item => (

                        <div
                            className="checkout-card"
                            key={item._id}
                        >

                            <img
                                // src={`https://mern-ecommerce-application-t0c8.onrender.com/${item.images?.[0]}`}
                                src={item.images?.[0]}
                                alt={item.name}
                                className="checkout-image"
                            />

                            <div className="checkout-info">

                                <h3>{item.name}</h3>

                                <p>
                                    Qty: {item.quantity}
                                </p>

                                <p>
                                    ₹ {item.price}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="summary-box">

                    <h2>Order Summary</h2>

                    <p>
                        Total Items :
                        {" "}
                        {cartItems.length}
                    </p>

                    <div className="total-price">
                        ₹ {subtotal}
                    </div>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                    >
                        Proceed To Pay
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Checkout;