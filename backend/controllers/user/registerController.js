// @desc    Register user
// @route   POST /api/users
// @access  Public
import User from "../../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

export const registerUser = expressAsyncHandler(async(req, res) => {
  const {email, password} = req.body;

  const isExistUser = await User.findOne({email});

  if (isExistUser) {
    res.status(400);
    throw new Error('User has registered yet');
  }

  const user = await User.create({
    email, password
  })

  // create token

  res.json(user);
});