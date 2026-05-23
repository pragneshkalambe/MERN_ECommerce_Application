import Product from "../models/Product.js";


// CREATE PRODUCT
const createProduct = async (req, res) => {

    try {

        let imagePaths = [];

        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => file.path);
        }

        console.log("body data:", req.body);

        const newProduct = await new Product({

            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            brand: req.body.brand,
            cellularData: req.body.cellularData,
            images: imagePaths

        }).save();

        console.log("New product:", newProduct);

        res.status(201).json(newProduct);

    }
    catch (error) {

        console.log("Error:", error.message);

        res.status(500).json({
            error: error.message
        });

    }

};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        let updateData = {
            ...req.body
        };

        console.log("data in controller through body:", req.body);

        // existing images
        let prevImages = product.images || [];

        // new images
        let newImages = [];

        if (req.files && req.files.length > 0) {
            newImages = req.files.map(file => file.path);
        }

        // merge images
        updateData.images = [...prevImages, ...newImages];

        const updated = await Product.findByIdAndUpdate(

            req.params.id,
            updateData,
            { new: true }

        );

        res.status(200).json(updated);

    }
    catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {

    try {
        let category = req.query.category;
        console.log(category);
        if (category) {
            let prodByCategory = await Product.find({category : category});
            console.log(prodByCategory);
            return res.status(200).json(prodByCategory)
        };

        let products = await Product.find();

        if (products) {
            res.status(200).json(products);
        }

    }
    catch (error) {

        console.log("Error:", error.message);

    }

};


// GET SINGLE PRODUCT
const getProduct = async (req, res) => {

    try {

        let product = await Product.findById(req.params.id);

        if (product) {

            console.log("in get product controller:", product);

            res.status(200).json(product);

        }

    }
    catch (error) {

        console.log(error.message);

        return res.status(500).json(error.message);

    }

};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const searchByName = async (req, res) => {

    try {

        let name = req.query.name;

        if (name.length < 3) {
            return;
        }

        let searchedProduct = await Product.find({
            name: {
                $regex: name,
                $options: "i"
            }
        });

        if (searchedProduct) {
            res.status(200).json(searchedProduct);
        }

    }
    catch (error) {

        console.log("error in search:", error.message);

        res.status(400).json({
            error: error.message
        });

    }

};


export default {

    createProduct,
    updateProduct,
    getProducts,
    getProduct,
    deleteProduct,
    searchByName

};