import { Request, Response} from 'express';
import { authService } from '../services/authService';
import {buildErrorResponse, buildSuccessResponse} from '../utils/utilities';

class AuthController {

  public register = async (req: Request, res: Response) => {
    try {
      const userRegistered = await authService.register(req);
      if (userRegistered) {
        const response = {
          statusCode: 200,
          message: 'User saved'
        };
        const standardResponse = buildSuccessResponse(response.statusCode, response.message);
        res.status(standardResponse.statusCode).send(standardResponse.body);
      } else {
        const errResponse = buildErrorResponse(userRegistered, 400, 'AUTH_ERROR', 'Unable to register user');
        res.status(errResponse.statusCode).send(errResponse.error);
      }
    } catch (err) {
      const errorResponse = buildErrorResponse(err);
      res.status(errorResponse.statusCode).send(errorResponse.error);
    }
  };

   public login = async (req: Request, res: Response) => {
       try {
         const userLoginToken = await authService.login(req);
         if (userLoginToken) {
           // console.log('userLoggedIn');
           const response = {
             statusCode: 200,
             message: 'User Logged In'
           };
           const standardResponse = buildSuccessResponse(response.statusCode, response.message);
           res.setHeader('Authorization', userLoginToken);
           res.status(standardResponse.statusCode).send(standardResponse.body);
         } else {
           console.log('user not logged in', userLoginToken);
           const errResponse = buildErrorResponse(userLoginToken, 400, 'AUTH_ERROR','Unable to login user');
           res.status(errResponse.statusCode).send(errResponse.error);
         }
       } catch (error) {
         console.log('login error', error);
         const errorResponse = buildErrorResponse(error);
         res.status(errorResponse.statusCode).send(errorResponse.error);
       }
   };

}

export const authController: AuthController = new AuthController();
