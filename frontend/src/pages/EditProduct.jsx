import { useState, useEffect } from 'react'
import { getProduct, updateProduct } from "../services/api.js";
import { useNavigate, useParams } from "react-router-dom";


function EditProduct() {
    const [formData, setFormData] =
        useState({
            name: "",
            price: "",
            category: "",
            brand: "",
            description: "",
            cellularData: ""
        });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchProduct =
            async () => {

                const data =
                    await getProduct(id);

                setFormData({
                    name: data.name,
                    price: data.price,
                    category: data.category,
                    brand: data.brand,
                    description: data.description,
                    cellularData: data.cellularData,
                });

            };

        fetchProduct();

    }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const form =
            new FormData();

        form.append(
            "name",
            formData.name
        );

        form.append(
            "price",
            formData.price
        );

        form.append(
            "category",
            formData.category
        );

        form.append(
            "brand",
            formData.brand
        );

        form.append(
            "description",
            formData.description
        );

        form.append(
            "cellularData",
            formData.cellularData
        );

        await updateProduct(
            id,
            form
        );

        navigate(
            "/admin/products"
        );

    };
    return (
        <div className="edit-product-container">

            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            price: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            category: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            brand: e.target.value
                        })
                    }
                />

                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }
                />

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>
    );
}



export default EditProduct