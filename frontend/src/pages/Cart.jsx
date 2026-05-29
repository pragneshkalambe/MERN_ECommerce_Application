import React, { useContext } from 'react'
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";
import { Link } from "react-router-dom";

function Cart() {

    const { cartItems, RemoveFromCart,IncreaseQty,DecreaseQty } = useContext(CartContext);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.price * item.quantity),
        0
    );

    return (
        <>
            {
                cartItems.length === 0 ? (

                    <div className="cart-page">

                        <h2>Your Cart Is Empty</h2>

                    </div>

                ) : (

                    <div className="cart-page">

                        {/* LEFT SECTION */}
                        <div className="cart-left">

                            {cartItems.map((item) => (

                                <div
                                    className="cart-card"
                                    key={item._id}
                                >

                                    <img
                                        src={`https://mern-ecommerce-application-t0c8.onrender.com/${item.images?.[0]}`}
                                        alt={item.name}
                                        className="cart-image"
                                    />

                                    <div className="cart-info">

                                        <h2 className="cart-title">
                                            {item.name}
                                        </h2>

                                        <p className="cart-price">
                                            ₹ {item.price}
                                        </p>

                                    </div>

                                    <div className="quantity-controls">

                                        <button
                                            className="qty-btn"
                                            onClick={() => DecreaseQty(item._id)}
                                        >
                                            -
                                        </button>

                                        <span className="qty-count">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="qty-btn"
                                            onClick={() => IncreaseQty(item._id)}
                                        >
                                            +
                                        </button>

                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => RemoveFromCart(item._id)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}

                        </div>

                        {/* RIGHT SECTION */}
                        <div className="cart-right">

                            <div className="cart-summary">

                                <h2 className="summary-title">
                                    Order Summary
                                </h2>

                                <div className="summary-row">

                                    <span>Total Items</span>

                                    <span>{cartItems.length}</span>

                                </div>

                                <div className="summary-row">

                                    <span>Subtotal</span>

                                    <span>₹ {subtotal}</span>

                                </div>

                                <Link className="checkout-btn"
                                to="/checkout">
                                    <button>
                                    Go to Checkout
                                    </button>
                                </Link>

                            </div>

                        </div>

                    </div>

                )
            }
        </>
    )
}

export default Cart;