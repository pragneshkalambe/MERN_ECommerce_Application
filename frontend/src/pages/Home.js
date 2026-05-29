import { useEffect, useState } from 'react'
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/Home.css';


function Home() {
    const [products, setproducts] = useState([]);
    const [selectedCategory, setselectedCategory] = useState("");
    const [currentPage, setcurrentPage] = useState(1);

    // let data = serviceApi.getProducts();
    // if (data) {
    //     setproducts(data);
    // }

    //use useEffect for Api calls
    // useEffect(() => {
    //     getProducts()
    //         .then(res => {
    //             console.log(res);
    //             setproducts(res)
    //         })
    //         .catch(err => console.log(err.message, " in fetching products."))
    // }, [])
    const productsPerPage = 4;
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    const currentProducts = products.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(products.length / productsPerPage);

    useEffect(() => {
        getProducts(selectedCategory)
            .then(res => setproducts(res))
            .catch(err => console.log("error in fetching category:", err.message))
    }, [selectedCategory])

    return (
        <>
            {/* <Navbar/> */}

            <div>
                {/* <div className="products-container">

                    {products && products.map((product) => (
                        <Link
                            to={`/products/${product._id}`}
                            key={product._id}
                            className={'product-link'}
                        >

                            <div className="product-card" key={product._id}>

                                <div className="image-container">
                                    <img
                                        src={`https://mern-ecommerce-application-t0c8.onrender.com/${product.images[0]}`}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                </div>

                                <div className="product-info">

                                    <h3 className="product-name">
                                        {product.name}
                                    </h3>

                                    <p className="product-brand">
                                        {product.description}
                                    </p>

                                    <p className="product-price">
                                        ₹ {product.price}
                                    </p>

                                    <button className="view-btn">
                                        View Details
                                    </button>

                                </div>

                            </div>

                        </Link>



                    ))}

                </div> */}

                <div className="home-container">

                    {/* LEFT FILTER SIDEBAR */}
                    <div className="filter-sidebar">

                        <h3>Category</h3>

                        <span onClick={() => setselectedCategory("")}>
                            All
                        </span>

                        <span onClick={() => setselectedCategory("mobile")}>
                            Mobile
                        </span>

                        <span onClick={() => setselectedCategory("laptop")}>
                            Laptop
                        </span>

                    </div>


                    {/* RIGHT PRODUCTS SECTION */}
                    <div className="products-section">

                        <h2 className="heading">
                            Home Page
                        </h2>

                        <div className="products-container">
                        
                            {/* {products && products.map((product) => ( */}
                            {currentProducts && currentProducts.map((product) => (


                                <Link
                                    to={`/products/${product._id}`}
                                    key={product._id}
                                    className={'product-link'}
                                >

                                    <div className="product-card">

                                        <div className="image-container">

                                            <img
                                                src={`https://mern-ecommerce-application-t0c8.onrender.com/${product.images?.[0]}`}
                                                alt={product.name}
                                                className="product-image"
                                            />

                                        </div>

                                        <div className="product-info">

                                            <h3 className="product-name">
                                                {product.name}
                                            </h3>

                                            <p className="product-brand">
                                                {product.description}
                                            </p>

                                            <p className="product-price">
                                                ₹ {product.price}
                                            </p>

                                            <button className="view-btn">
                                                View Details
                                            </button>

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>
                        <div className="pagination">

                                {[...Array(totalPages)].map((_, index) => (

                                    <button
                                        key={index}
                                        onClick={() => setcurrentPage(index + 1)}
                                        className={
                                            currentPage === index + 1
                                                ? "active-page"
                                                : ""
                                        }
                                    >
                                        {index + 1}
                                    </button>

                                ))}

                            </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Home