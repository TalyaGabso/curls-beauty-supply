const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

const productController = require("../controllers/product.controller")

router
   // all products
   .get("/all-products", auth, productController.getAllProducts)
   // get products by category
   .get("/:category", auth, productController.getByCategory)
   // get products by brand
   .get("/:brand", auth, productController.getByBrand)
   // get products by id
   .get("/:id", auth, productController.getById)
   // create a new product
   .post("/create-new-product", productController.createNewProduct)
   // edit a product
   .put("/edit/:id", auth, productController.editProduct)
   // delete a product
   .delete("/:id", auth, productController.deleteProduct)

module.exports = router;
