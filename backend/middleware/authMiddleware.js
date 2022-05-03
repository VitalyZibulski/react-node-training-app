import jwt from 'jsonwebtoken';
import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js';

export const protect = expressAsyncHandler(async(req, res, next) => {
  let token;
  if (req.headers.authorization?.startWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    const userFound = await User.findById(decoded.userId).select('-password');
    if (userFound) {
      req.user = userFound;
      next();
    } else {
      res.status(401);
      throw new Error('You are not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('You are not authorized, token does not exist');
  }
})

// export const admin = (req, res, next) => {
//   if (req.user.roles.includes('admin')) {
//     next();
//   } else {
//     throw new Error('Tou don\'t have access');
//   }
// }