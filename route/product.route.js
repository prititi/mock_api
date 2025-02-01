const express = require("express");
const Product = require("../model/product.model");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// ✅ Get product by ID
router.get("/:id", async (req, res) => {
    const productId = req.params.id;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        // Log the query that will be executed
        const product = await Product.findById(productId);

        if (!product) {
            // If product not found
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product by ID", error });
    }
});





// ✅ Add a new product
router.post("/", async (req, res) => {
    try {
        const { name, price, category, stockQuantity } = req.body;
        const newProduct = new Product({ name, price, category, stockQuantity });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: "Error adding product", error });
    }
});

// ✅ Update a product by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return updated product
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
});

// ✅ Delete a product by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});

module.exports = router;
