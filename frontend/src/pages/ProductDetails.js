import { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
// import Product from "../../../backend/models/product";
import { getProduct } from "../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import "swiper/css";
import { CartContext } from "../context/CartContext.jsx";

function ProductDetails() {
    const { id } = useParams();
    const [product, setproduct] = useState(null);
    const {AddToCart} = useContext(CartContext);

    useEffect(() => {
        getProduct(id)
            .then(res => setproduct(res))
            .catch(err => console.log(err.message))
    }, [id])

    return (
        <>
            {/* <h3>ProductDetails</h3> */}
            {product && (
                // <div>


                <div className="details-page">

                    <div className="details-container">

                        <div className="details-left"
                        key={product._id}>

                            <Swiper
                                spaceBetween={50}
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                            >

                                {product.images.map((image) => (

                                    <SwiperSlide key={image}>

                                        <img
                                            src={`http://localhost:5000/${image}`}
                                            alt={product.name}
                                            className="details-image"
                                        />

                                    </SwiperSlide>

                                ))}

                            </Swiper>

                        </div>

                        <div className="details-right">

                            <h1 className="details-title">
                                {product.name}
                            </h1>

                            <p className="details-price">
                                ₹ {product.price}
                            </p>

                            <p className="details-description">
                                {product.description}
                            </p>

                            <p className="details-brand">
                                Brand : {product.brand}
                            </p>

                            <p className="details-category">
                                Category : {product.category}
                            </p>

                            <button className="details-btn"
                            onClick={() => AddToCart(product)}>
                                Add To Cart
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>


    )
}

export default ProductDetails