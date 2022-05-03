import express from 'express';
import {getUserProfile} from "../controllers/user/profileController.js";
import {registerUser} from "../controllers/user/registerController.js";
import {protect} from "../middleware/authMiddleware.js";
import {authUser} from "../controllers/user/authController.js";

const router = express.Router();

router.route('/profile').get(protect, getUserProfile); // protect, admin. manager, getUserProfile (next)
router.route('/login').post(authUser); // protect, admin. manager, getUserProfile (next)
router.route('/').post(registerUser);

export default router;