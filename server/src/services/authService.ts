import {generateHash, User, validPassword} from '../mongoDb/models/user.model';
import {mongoClient} from '../mongoDb/mongoClient';
import jwt from 'jsonwebtoken';
import {envConstants} from "../config/envConfig";
import {UserInterface} from "../interfaces/userInterface";
import {LoginInterface} from "../interfaces/loginInterface";

class AuthService {

  public register = async (req: any) => {
      const {name, phoneNumber, email, password, role} = req.body;
      try {
        const userData: UserInterface = {
          name,
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
        const query: LoginInterface = {
          email
        };
        // console.log('login service query', query)
        const user: any = await mongoClient.findOne(User, query);
        if (!user) {
          throw this.buildErr("User doesn't exists");
        } else if (!validPassword(password, user.password)) {
          throw this.buildErr('Incorrect password');
        } else {
          const userJson = {
            _id: user._id,
            role: user.role,
            email: user.email,
            name: user.name
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
