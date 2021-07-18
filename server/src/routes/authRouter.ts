import {NextFunction, Request, Router} from 'express';
import { authController } from '../controllers/authController';
import {checkReqBodyParams} from "../middleware";

const authRouter = Router();

authRouter.post('/register', checkReqBodyParams, authController.register);

authRouter.post('/login', checkReqBodyParams,  authController.login);

export default authRouter;
