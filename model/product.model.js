const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stockQuantity: Number,
}, { collection: 'products' });

ProductSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;  // Rename `_id` to `id`
    delete ret._id;     // Remove `_id`
    delete ret.__v;     // Remove `__v` (Mongoose version key)
  }
});

const Product = mongoose.model("Product", ProductSchema);


module.exports = Product;
