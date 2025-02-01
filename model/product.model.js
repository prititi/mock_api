const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    stockQuantity: Number,
  }, { collection: 'products' });
  
  const Product = mongoose.model("Product", ProductSchema);
  

module.exports = Product;
