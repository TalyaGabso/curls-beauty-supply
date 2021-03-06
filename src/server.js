const path = require('path');
const express = require('express');
const cors = require('cors');

// const dotenv = require('dotenv');
// dotenv.config();
// const { notFound, errorHandler } = require('./middleware/error.middleware');
require('./config/mongooseDB');

const usersRoute = require('./routes/user.route');
const productsRoute = require('./routes/product.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use(notFound)
// app.use(errorHandler)


// API ROUTES
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);

// Front Connection
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
};


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});


//--Temporery => Static Data--//
// const products = require('./staticData/product.data');
// app.get("api/products", (req, res) => {
//   console.log(products);
//   res.json(products);
// });
// app.get("api/products/:id", (req, res) => {
//   const product = products.find((product) => product._id === req.paramps.id);
//   console.log('server product: ', product);
//   res.json(product);
// });