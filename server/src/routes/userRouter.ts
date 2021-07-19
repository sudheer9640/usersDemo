import {Router, } from 'express';
import passport from "passport";
import {userController} from '../controllers/userController';
import {isAuthorized} from "../middleware";
import {roles} from "../constants/constants";

const userRouter = Router();

userRouter.get('/', isAuthorized([roles.ADMIN]),
    passport.authenticate('jwt', { session: false }),userController.getUsers);
userRouter.get('/:id', isAuthorized([roles.EMPLOYEE, roles.ADMIN]),
    passport.authenticate('jwt', {session: false}), userController.getUser);




export default userRouter;
