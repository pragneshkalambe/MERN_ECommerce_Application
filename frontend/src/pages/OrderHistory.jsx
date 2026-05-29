import { useEffect, useState } from "react";
import { getCustomerOrders } from "../services/api";
import "../styles/OrderHistory.css";

function OrderHistory() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const customer =
            JSON.parse(localStorage.getItem("customer"));

        if (!customer) return;
        setLoading(true);

        getCustomerOrders(customer.id)
            .then((data) => {

                console.log("orders:", data);

                setOrders(data);
                setLoading(false);

            })
            .catch((err) =>
                console.log(err.message)
            );
        setLoading(false);

    }, []);

    return (

        <div className="orders-container">

            {loading ? (

                <h2>Loading Orders...</h2>

            ) : (

                <>
                    <h2>My Orders</h2>

                    {orders.length === 0 ? (

                        <p>No orders found</p>

                    ) : (

                        orders.map((order) => (

                            <div
                                className="order-card"
                                key={order._id}
                            >

                                <h3>
                                    Order ID: {order._id}
                                </h3>

                                <p>
                                    Total: ₹ {order.totalAmount}
                                </p>

                                <span
                                    className={`status-badge ${order.orderStatus.toLowerCase()}`}
                                >
                                    {order.orderStatus}
                                </span>

                                <p>
                                    Payment: {order.paymentId}
                                </p>

                                <hr />

                                {order.products.map((product) => (

                                    <div
                                        className="ordered-product"
                                        key={product._id}
                                    >

                                        <img
                                            src={`https://mern-ecommerce-application-t0c8.onrender.com/${product.image}`}
                                            alt={product.name}
                                            className="product-image"
                                        />

                                        <div>

                                            <p>
                                                {product.name}
                                            </p>

                                            <p>
                                                Qty: {product.quantity}
                                            </p>

                                            <p>
                                                ₹ {product.price}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ))

                    )}

                </>

            )}

        </div>

    );
}

export default OrderHistory;