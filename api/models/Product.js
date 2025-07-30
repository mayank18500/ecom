const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  name: String,
  value: String,
  image: String
}, { _id: false });

const SizeSchema = new mongoose.Schema({
  name: String,
  inStock: Boolean
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  images: [String],
  category: String,
  subcategory: String,
  description: String,
  features: [String],
  materials: [String],
  careInstructions: [String],
  colors: [ColorSchema],
  sizes: [SizeSchema],
  rating: Number,
  reviews: Number,
  isNew: Boolean,
  isSale: Boolean,
  inStock: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema); 