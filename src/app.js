const express = require('express');
const cors = require('cors');
require('./config/mongooseDB');
const bcrypt = require('bcryptjs')

const usersRoute = require('./routes/user.route');
const productsRoute = require('./routes/product.route');

const app = express();

// express middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);

// connect to front
if (process.env.NODE_ENV === 'production') {
   // Exprees will serve up production assets
   app.use(express.static('client/build'));

   // Express serve up index.html file if it doesn't recognize route
   const path = require('path');
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
};

module.exports = app;