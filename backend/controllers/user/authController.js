import User from "../../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import {generateToken} from "../../helpers/generateToken.js";

// @desc    Auth user
// @route   POST /api/users/login
// @access  Public
export const authUser = expressAsyncHandler(async(req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.json({user, token});
  } else {
    res.status(401);
    throw new Error('Wrong  email or password');
  }
});