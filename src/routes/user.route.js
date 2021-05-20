const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

const userController = require("../controllers/user.controller")

router
   //get all the users
   .get("/accounts", userController.getAll)
   // get user personal account
   .get("/account", auth, userController.myAccount)
   // create new acccount
   .post("/register", userController.register)
   // login to an existing account
   .post("/login", userController.login)
   // logout from the account
   .post("/logout", userController.logout)
   // edit the account
   .put("/account/update", auth, userController.updateAccount)
   // delete the account
   .delete("/account/:id", auth, userController.deleteAccount)

module.exports = router;