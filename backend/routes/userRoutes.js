import express from 'express';
import {getUserProfile} from "../controllers/user/profileController.js";
import {registerUser} from "../controllers/user/registerController.js";

const router = express.Router();

router.route('/profile').get(getUserProfile);
router.route('/').post(registerUser);

export default router;