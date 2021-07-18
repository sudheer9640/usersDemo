import {generateHash, User, validPassword} from '../mongoDb/models/user.model';
import {mongoClient} from '../mongoDb/mongoClient';
import jwt from 'jsonwebtoken';
import {constants} from "../constants/constants";
import {envConstants} from "../config/envConfig";


class AuthService {

  public register = async (req: any) => {
      const {userName, phoneNumber, email, password, role} = req.body;
      try {
        const userData: any = {
          userName,
          phoneNumber,
          email,
          role
        };
        userData.password = generateHash(password);
        const userSaved = await mongoClient.save(User, userData);
        if (userSaved) {
          return true;
        } else {
          throw userSaved;
        }
      } catch (err) {
        throw err;
      }
  };

  public login = async (loginRequest: any) => {
    try {
      const { email, password} = loginRequest.body;
      try {
        const query: any = {
          email
        };
        // console.log('login service query', query)
        const user: any = await mongoClient.findOne(User, query);
        if (!user) {
          throw this.buildErr("User doesn't exists");
        } else if (!validPassword(password, user.password)) {
          this.buildErr('Incorrect password');
        } else {
          const userJson = {
            _id: user._id,
            role: user.role,
            fullName: user.fullName,
            instId: user.instId
          };
          const token = jwt.sign(userJson, envConstants.JWT_SECRET, {
            expiresIn: 604800 // 1 week
          });
          return token;
        }
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  };

  private buildErr(errMessage: string) {
    const error: any = new Error(errMessage);
    error.statusCode = 400;
    return error;
  }
}

export const authService: AuthService = new AuthService();
