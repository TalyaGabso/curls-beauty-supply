const express = require('express');
const User = require('../models/user.model');
const auth = require('../middleware/auth');
const router = new express.Router();

const userController = require("../controllers/user.controller")

router
   //get all the users
   .get("/all-accounts", auth, userController.getAll)
   // get user personal account
   .get("/my-account", auth, userController.myAccount)
   // create new acccount
   .post("/create-new-account", userController.newAccount)
   // login to an existing account
   .post("/login", userController.login)
   // logout from the account
   .post("/logout", auth, userController.logout)
   // edit the account
   .put("/my-account/edit", auth, userController.editAccount)
   // delete the account
   .delete("/my-account", auth, userController.deleteAccount)

module.exports = router;