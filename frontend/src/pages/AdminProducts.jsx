import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getProducts,
    deleteProduct
} from "../services/api.js";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        const data = await getProducts();

        setProducts(data);
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this product?"
            );

        if (!confirmDelete) return;

        try {

            await deleteProduct(id);

            setProducts(prev =>
                prev.filter(
                    product =>
                        product._id !== id
                )
            );

        } catch (error) {

            console.log(error);

        }

    };
    return (

        <div className="admin-products-container">

            <div className="admin-header">

                <h1>
                    Product Management
                </h1>

                <button
                    className="add-product-btn"
                    onClick={() =>
                        navigate("/admin/products/add")
                    }
                >
                    Add Product
                </button>
            </div>

            <table className="products-table">

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Actions</th>

                    </tr>

                </thead>
                <tbody>

                    {products.map(product => (

                        <tr key={product._id}>

                            <td>
                                <img
                                    src={`http://localhost:5000/${product.images?.[0]}`}
                                    alt={product.name}
                                    width="60"
                                />
                            </td>

                            <td>{product.name}</td>

                            <td>{product.category}</td>

                            <td>₹ {product.price}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/admin/products/edit/${product._id}`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(product._id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default AdminProducts;