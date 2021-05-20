const { response } = require('express');
const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/user.model');

//--GET--//
// all accounts
const getAll = async (req, res) => {
   try {
      const users = await UserModel.find({})
      return res.send(users);
   } catch (e) {
      return res.status(500)
   };
};

// a user account
const myAccount = async (req, res) => {
   const user = await UserModel.findById(req.user._id);
   console.log('NY ACCOUNT USER', user);

   if (user) {
      res.send({ user });
   } else {
      res.status(404).send('User Not Found');
   };
};


//--POST--//

// create new account
const register = async (req, res) => {
   const { firstName, lastName, email, password } = req.body
   const userExists = await UserModel.findOne({ email });
   console.log('NEW ACCOUNT - IS USER EXISTS:', userExists);

   if (userExists) {
      return res.status(400).send('User already exists');
   };
   const user = new UserModel({ firstName, lastName, email, password });
   console.log('New Account USER: ', user);
   try {
      if (user) {
         await user.save();
         // create auth tokens
         const token = await user.generateAuthToken();
         res.status(201).send({ user, token });
      };
   } catch (err) {
      console.log('ERROR: ', err.message);
      res.status(400).send(err.message);
   };
};

// login to account
const login = async (req, res) => {
   console.log('=============> LOGIN FUNCTION');
   try {
      console.log('req.body.email: ', req.body.email);
      console.log('req.body.password: ', req.body.password);

      const user = await UserModel.findByCredentials(req.body.email, req.body.password);
      console.log('login function USER: ', user);

      const token = await user.generateAuthToken();
      console.log('login function TOKEN: ', token);

      res.send({ user, token });
   }
   catch (err) {
      console.log('login function ERROR: ', err);
      res.status(400).send(err);
   };
};

// logout from the account
const logout = async (req, res) => {
   try {
      req.user.token = req.user.tokens.filter((token) => {
         return token.token !== req.token;
      });

      await req.user.save();
      res.send("Log out succesful");
   } catch (e) {
      return res.status(500).send(e);
   };
};


//--PUT--//
// edit user account
const updateAccount = async (req, res) => {
   const user = await UserModel.findById(req.user._id);
   console.log('UPDATE ACCOUNT - USER', user);

   if (user) {
      const updates = Object.keys(req.body);
      console.log('UPDATE ACCOUNT - UPDATES', updates);

      const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));
      console.log('UPDATE ACCOUNT - IS VALID', isValidOperation);

      if (!isValidOperation) {
         return res.status(400).send({ error: 'Invalid Update!' })
      };

      try {
         updates.forEach((update) => user[update] = req.body[update]);
         user.save();

         res.status(201).send('Your Account Was Successfuly Updated. ')
      } catch (err) {
         console.log('ERROR: ', err.message);
         res.status(400).send(err.message);
      };
   } else {
      return res.status(404).send('User Not Found');
   };
};

//--DELETE--//
const deleteAccount = async (req, res) => {
   try {
      await req.user.remove()
      res.send(req.user);
   } catch (e) {
      res.status(500).send();
   };
};

module.exports = {
   // GET: all users account
   getAll,
   // GET: user account
   myAccount,
   // POST: create a new account
   register,
   // POST: login
   login,
   // POST: logout
   logout,
   // PUT: edit an account profile
   updateAccount,
   // DELETE: delete an account
   deleteAccount,
};