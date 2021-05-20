const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cart = require('./cart.model');
const orderSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   orderItems: [
      {
         productName: {
            type: String,
            required: true,
            trim: true
         },
         qty: {
            type: Number,
            required: true
         },
         image:
         {
            type: String,
            required: true,
            trim: true
         },
         price: {
            type: Number,
            required: true
         },
         productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
         },
      },
   ],
   shippingAddress: {
      address: {
         type: String,
         required: true,
         unique: true,
         trim: true
      },
      city: {
         type: String,
         required: true,
         unique: true,
         trim: true
      },
      zipCode: {
         type: String,
         required: true,
         unique: true,
         trim: true
      },
      country: {
         type: String,
         required: true,
         unique: true,
         trim: true
      },
   },
   paymentStatus: {
      id: { type: String },
      statusResult: { type: String },
      update_time: { type: String },
   },
   totalPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   isPaid: {
      type: Boolean,
      required: true,
      default: false
   },
   datePaid: {
      type: Date,
      required: true,
      unique: false,
   }
}, {
   timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;