import express from "express";

const Router = express.Router();

import productController from "../controllers/productController.js";

import uploads from "../middleware/multer.js";


// GET ALL PRODUCTS
Router.get("/", productController.getProducts);


// SEARCH PRODUCT
Router.get("/search", productController.searchByName);


// GET SINGLE PRODUCT
Router.get("/:id", productController.getProduct);


// CREATE PRODUCT
Router.post(
    "/",
    uploads.array("images", 5),
    productController.createProduct
);


// UPDATE PRODUCT
Router.put(
    "/:id",
    uploads.array("images", 5),
    productController.updateProduct
);


// DELETE PRODUCT
Router.delete("/:id", productController.deleteProduct);


export default Router;