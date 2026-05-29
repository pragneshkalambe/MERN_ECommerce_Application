import {useState,useEffect} from 'react'
import {Link, useSearchParams} from "react-router-dom";
import {  searchByName } from "../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

function SearchFilter() {

    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const [filteredProduct, setfilteredProduct] = useState([]);

    useEffect(() => {
        if (!name) return;
      searchByName(name)
      .then(res => setfilteredProduct(res))
      .catch(err => console.log(err.message))
    }, [name])
    
    return (
        <>
            <h3>
                SearchFilter
            </h3>

           {filteredProduct && filteredProduct.map((product) => (

                <div className="details-page">

                    <div className="details-container">

                        <div className="details-left">

                            <Swiper
                                spaceBetween={50}
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                            >

                                {product.images?.map((image) => (

                                    <SwiperSlide key={image}>

                                        <img
                                            src={`https://mern-ecommerce-application-t0c8.onrender.com/${image}`}
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

                            <Link to={"/"} className="back-btn">
                                Back
                            </Link>

                        </div>

                    </div>

                </div>
           ))
           }
        </>
    )
}

export default SearchFilter