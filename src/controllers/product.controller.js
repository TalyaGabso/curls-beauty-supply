const ProductModel = require('../models/product.model');

//--GET--//
// all products
const getAllProducts = async (req, res) => {
   try {
      const products = await ProductModel.find({});
      if (!products) {
         return res.status(404).send();
      };
      return res.send(products);
   } catch (err) {
      return res.status(500)
   };
};

// by category
const getByCategory = async (req, res) => {
   try {
      const products = await ProductModel.find({ category: req.params.category });
      if (!products) {
         return res.status(404).send();
      };
      return res.send(products);
   } catch (err) {
      return res.status(500)
   };
};

// by brand
const getByBrand = async (req, res) => {
   try {
      const products = await Product.find({ brand: req.params.brand });
      if (!products) {
         return res.status(404).send();
      };
      return res.send(products);
   } catch (err) {
      return res.status(500)
   };
};

// by product id
const getById = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      return res.send(product);
   } catch (err) {
      res.status(404);
      throw new Error('Product not found');
   };
};


//--POST--//
// create new product(only admin)
const createNewProduct = async (req, res) => {
   console.log('createNewProduct: ', req);

   const product = new ProductModel(req.body);
   try {
      const newProduct = await product.save();
      res.status(201).send(`New products was successfully added. ${newProduct}`);
   } catch (err) {
      res.status(400).send(err);
   };
};


//--PUT--//
// edit product(only admin)
const editProduct = async (req, res) => {
   console.log('editProduct: ', req);

   const updates = Object.keys(req.body);
   const allowedUpdates = ['productName', 'image', 'description', 'brand', 'category', 'price', 'availableQty'];
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

   if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid Update!' })
   };

   try {
      const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!product) {
         return res.status(404).send();
      };
      res.send(product);
   } catch (err) {
      res.status(400).send(err);
   };
};


//--DELETE--//
const deleteProduct = async (req, res) => {
   console.log('deleteProduct: ', req);
   console.log('deleteProduct Product: ', req, req.product);
   try {
      await req.product.remove()
      res.send(req.product);
   } catch (e) {
      res.status(500).send();
   };
};

module.exports = {
   // GET: all products
   getAllProducts,
   // GET: products by category
   getByCategory,
   // GET: products by brand
   getByBrand,
   // GET: products by id
   getById,
   // POST: create a new product
   createNewProduct,
   // PUT: edit a product
   editProduct,
   // DELETE: delete a product
   deleteProduct
};
