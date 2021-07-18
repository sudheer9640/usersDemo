import { expect } from 'chai';
import {userService} from './userService';


describe('userController', () => {


  it('should filter users by username', () => {
    const mockUsersArray: any[] = [
      {
        _id: 0,
        name: 'cab'
      },
      {
        _id: 1,
        name: 'android'
      },
      {
        _id: 2,
        name: 'basket'
      }];
    const result = userService.sortUsers(mockUsersArray);
    expect(result).to.equal(result)
  });
});
