const express = require('express');
require('./db/mongoose');
const cors = require('cors');

const bcrypt = require('bcryptjs')

// import Routes
const usersRoute = require('./routes/user.route');
// const shopRoute = require('./routes/shop.route');

const app = express();

// express middleware
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/users", usersRoute);
// app.use("/api/shop", shopRoute);


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