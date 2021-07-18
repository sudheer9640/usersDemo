import {mongoClient} from '../mongoDb/mongoClient';
import {User} from '../mongoDb/models/user.model';

class UserService {

  public sortUsers(users: any): any {
    return users.sort((u1: any, u2: any) => (u1.name > u2.name ? 1 : -1));
  };

  public getAllUsers = async (req: any) => {
    try {
      const users = await mongoClient.find(User);
      if (users) {
        return this.sortUsers(users);
      } else {
        throw false;
      }
    } catch (err) {
      throw err;
    }
  };

  public getUser = async (req: any) => {
    const {id} = req.params;
    try {
      const user = await mongoClient.findById(User, id);
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  };
}

export const userService: UserService = new UserService();
