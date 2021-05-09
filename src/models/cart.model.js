const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cartSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   CartSummery: [{
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
         trim: true
      },
      img: {
         type: String,
         required: true,
         unique: false,
         trim: true
      },
      price: {
         type: Number,
         required: true,
         unique: false,
         trim: true
      }
   }]
}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;