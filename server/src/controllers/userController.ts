import {Request, Response} from 'express';
import {userService} from '../services/userService';
import {buildErrorResponse, buildSuccessResponse} from '../utils/utilities';

class UserController {

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers(req);
      if (users) {
        const response = {
          statusCode: 200,
          data: users,
          message: 'Sending users'
        };
        const standardResponse = buildSuccessResponse(response.statusCode, response.message, response.data);
        res.status(standardResponse.statusCode).send(standardResponse.body);
      } else {
        const errResponse = buildErrorResponse(users, 400, 'USER_ERROR', 'Unable to get users');
        res.status(errResponse.statusCode).send(errResponse.error);
      }
    } catch (err) {
      const errorResponse = buildErrorResponse(err);
      res.status(errorResponse.statusCode).send(errorResponse.error);
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const user = await userService.getUser(req);
      if (user) {
        const response = {
          statusCode: 200,
          data: user,
          message: 'Sending users'
        };
        const standardResponse = buildSuccessResponse(response.statusCode, response.message, response.data);
        res.status(standardResponse.statusCode).send(standardResponse.body);
      } else {
        const errResponse = buildErrorResponse(user, 400, 'USER_ERROR', 'Unable to send user');
        res.status(errResponse.statusCode).send(errResponse.error);
      }
    } catch (err) {
      const errorResponse = buildErrorResponse(err);
      res.status(errorResponse.statusCode).send(errorResponse.error);
    }
  };
}

export const userController: UserController = new UserController();
