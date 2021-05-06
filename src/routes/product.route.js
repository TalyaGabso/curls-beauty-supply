const express = require('express');
const Product = require('../models/product.model');
const auth = require('../middleware/auth');
const router = new express.Router();

const userController = require("../controllers/product.controller")

router.get('/', async (req, res) => {
   const products = await Product.find({})
   res.json(products)
})
module.exports = router;