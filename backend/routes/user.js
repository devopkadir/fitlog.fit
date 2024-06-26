// user.js
import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';

const userRouter = express.Router();

// ! login route
userRouter.post('/login', loginUser);

// ! signup route
userRouter.post('/signup', signupUser);

export default userRouter;
