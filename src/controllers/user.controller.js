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
   res.send(req.user);
};


//--POST--//

// create new account
const newAccount = async (req, res) => {
   const user = new UserModel(req.body);
   try {
      await user.save()
      // create auth tokens
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
   } catch (e) {
      res.status(400).send(e);
   };
};

// login to account
const login = async (req, res) => {
   try {
      const user = await UserModel.findByCredentails(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({ user, token });
   } catch (e) {
      res.status(400).send(e);
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
const editAccount = async (req, res) => {
   const updates = Object.keys(req.body);
   const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

   if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid Update!' })
   };

   try {
      updates.forEach((update) => req.user[update] = req.body[update]);
      await req.user.save();
      res.send(req.user);
   } catch (e) {
      res.status(400).send(e);
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
   newAccount,
   // POST: login
   login,
   // POST: logout
   logout,
   // PUT: edit an account profile
   editAccount,
   // DELETE: delete an account
   deleteAccount,
};