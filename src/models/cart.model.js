const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const itemSchema = new mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
   },
   productName: {
      type: String,
      required: true,
      unique: false,
      trim: true
   },
   qty: {
      type: Number,
      required: true,
      unique: false,
      min: 1,
   },
   images: [{
      type: String,
      required: true,
      unique: false,
      trim: true
   }],
   price: {
      type: Number,
      required: true,
      unique: false,
   }
}, {
   timestamps: true
});

const cartSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   // state
   // modifiedOn
   CartSummery: [itemSchema]
}, {
   timestamps: true
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;