import { Router } from 'express';
import { registerUser, 
  loginUser, 
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile, } from '../controllers/user.controller.js';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser).get(authenticate, authorizeAdmin, getAllUsers) ;
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutCurrentUser);
userRouter.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile);

export default userRouter;