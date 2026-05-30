import { Router } from 'express';
import { registerUser, 
  loginUser, 
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile, } from '../controllers/user.controller.js';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.route('/register').post(registerUser).get(authenticate, authorizeAdmin, getAllUsers) ;
router.route('/login').post(loginUser);
router.route('/logout').post(logoutCurrentUser);
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile);

export default router;