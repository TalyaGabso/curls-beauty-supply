const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const productSchema = new mongoose.Schema({
   // which admin created product
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   productName: {
      type: String,
      required: true,
      unique: false,
      trim: true
   },
   image: {
      type: String,
      required: true,
      unique: false,
      trim: true
   },
   description: {
      type: String,
      required: true,
      unique: false,
      trim: true
   },
   brand: {
      type: String,
      required: true,
      unique: false,
      trim: true
   },
   category: {
      type: String,
      required: true,
      unique: false,
      trim: true
   },
   price: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      default: 0
   },
   availableQty: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      default: 0
   },
   rating: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      default: 0
   },
   totalRating: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      default: 0
   },
   // prooerties:
   //HAIR: best for taxture type
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;