import { Router } from 'express';
import passport from "passport";
import {userController} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', passport.authenticate('jwt', { session: false }),userController.getUsers);
userRouter.get('/:id', passport.authenticate('jwt', { session: false }), userController.getUser);

export default userRouter;
