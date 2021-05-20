const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const auth = async (req, res, next) => {
   const headerAuth = req.headers.authorization;
   console.log('AUTH - HEADER AUTH', headerAuth);

   if (headerAuth && headerAuth.startsWith('Bearer')) {
      try {
         const token = headerAuth.split(' ')[1]
         console.log('AUTH - TOKEN: ', token);

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         console.log('Auth DECODED: ', decoded);

         req.user = await UserModel.findById(decoded._id).select('-password');
         const user = req.user;
         console.log('AUTH REQ USER: ', req.user);

         if (!user) {
            console.log('AUTH - !USER', user);
            res.status(401)
            throw new Error('Not authorized, user not exist')
         };
         if (!token) {
            console.log('AUTH - !TOKEN', token);
            res.status(401)
            throw new Error('Not authorized, no token')
         };

         next();
      } catch (err) {
         console.log('AUTH ERROR:', err.message);
         res.status(401).send({ error: "Please authenticate." });
      };
   }

};

module.exports = auth;
// const auth = async (req, res, next) => {
//    try {
//       // const token = req.header('Authorization').replace('Bearer', '');
//       const token = req.headers.authorization.split(' ')[1]
//       console.log('Auth TOKEN: ',token);

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('Auth DECODED: ', decoded);

//       const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token': token })
//       console.log('Auth USER: ', user);
//       if (!user) {
//          throw new Error();
//       };

//       req.token = token;
//       console.log('Auth REQ TOKEN: ', req.token);

//       req.user = user;
//       console.log('Auth REQ USER', req.user);

//       next();

//    } catch (err) {
//       console.log('AUTH ERROR:', err);
//       res.status(401).send({ error: "Please authenticate." });
//    };
// };