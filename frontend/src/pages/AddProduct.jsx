import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/api.js";

function AddProduct() {

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        description: "",
        cellularData: "",
    });

    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const form = new FormData();

        form.append("name", formData.name);
        form.append("price", formData.price);
        form.append("category", formData.category);
        form.append("brand", formData.brand);
        form.append("description", formData.description);
        form.append("cellularData", formData.cellularData);

        for (let i = 0; i < images.length; i++) {
            form.append("images", images[i]);
        }

        await createProduct(form);

        navigate("/admin/products");
    };

    return (

        <div className="add-product-container">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Product Name"
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
                    placeholder="Price"
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
                    placeholder="Category"
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
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            brand: e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Cellular Data (4g/5g)"
                    value={formData.cellularData}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            cellularData: e.target.value
                        })
                    }
                />

                <input
                    type="file"
                    multiple
                    onChange={(e) =>
                        setImages(e.target.files)
                    }
                />

                <button type="submit">
                    Add Product
                </button>

            </form>

        </div>
    );
}

export default AddProduct;