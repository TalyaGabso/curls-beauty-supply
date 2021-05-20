const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

const productController = require("../controllers/product.controller");


router
   // all products
   .get("/all", productController.getAllProducts)
   // get products by category
   .get("/category/:category", productController.getByCategory)
   // get products by brand
   .get("/brand/:brand", productController.getByBrand)
   // get products by id
   .get("/product/:id", productController.getById)
   // create a new product
   .post("/create_new_product", auth, productController.createNewProduct)
   // edit a product
   .put("/edit/:id", productController.editProduct)
   // delete a product
   .delete("/delete/:id", productController.deleteProduct)

module.exports = router;
