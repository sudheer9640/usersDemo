"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const userService_1 = require("./userService");
describe('userController', () => {
    it('should filter users by username', () => {
        const mockUsersArray = [
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
            }
        ];
        const result = userService_1.userService.sortUsers(mockUsersArray);
        chai_1.expect(result).to.equal(result);
    });
});
