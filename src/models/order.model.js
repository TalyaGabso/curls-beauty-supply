const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const orderSchema = new mongoose.Schema({
   orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   orderSummery: [{
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
      },
      product: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Product'
      }
   }],
   shippingAdrdess: {
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
   paymentMethod: {
      type: String,
      required: true,
      unique: false,
      trim: true
   },
   paymentStatus: {
      id: { type: String },
      statusResult: { type: String },
      update_time: { type: String },
   },
   tax: {
      type: number,
      required: true,
      trim: true,
      default: 0.0
   },
   shipping: {
      type: number,
      required: true,
      trim: true,
      default: 0.0
   },
   totalPrice: {
      type: number,
      required: true,
      trim: true,
      default: 0.0
   },
   isPaid: {
      type: Boolean,
      required: true,
      trim: true,
      default: false
   },
   datePaid: {
      type: Date,
      required: true,
      unique: false,
      trim: true
   },
   isDelivered: {
      type: Boolean,
      required: true,
      trim: true,
      default: false
   },
   dateDelivered: {
      type: Date,
      required: true,
      unique: false,
      trim: true
   },
}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;