"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
const utilities_1 = require("../utils/utilities");
class UserController {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.userService.getAllUsers(req);
                if (users) {
                    const response = {
                        statusCode: 200,
                        data: users,
                        message: 'Sending users'
                    };
                    const standardResponse = utilities_1.buildSuccessResponse(response.statusCode, response.message, response.data);
                    res.status(standardResponse.statusCode).send(standardResponse.body);
                }
                else {
                    const errResponse = utilities_1.buildErrorResponse(users, 400, 'USER_ERROR', 'Unable to get users');
                    res.status(errResponse.statusCode).send(errResponse.error);
                }
            }
            catch (err) {
                const errorResponse = utilities_1.buildErrorResponse(err);
                res.status(errorResponse.statusCode).send(errorResponse.error);
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService_1.userService.getUser(req);
                if (user) {
                    const response = {
                        statusCode: 200,
                        data: user,
                        message: 'Sending users'
                    };
                    const standardResponse = utilities_1.buildSuccessResponse(response.statusCode, response.message, response.data);
                    res.status(standardResponse.statusCode).send(standardResponse.body);
                }
                else {
                    const errResponse = utilities_1.buildErrorResponse(user, 400, 'USER_ERROR', 'Unable to send user');
                    res.status(errResponse.statusCode).send(errResponse.error);
                }
            }
            catch (err) {
                const errorResponse = utilities_1.buildErrorResponse(err);
                res.status(errorResponse.statusCode).send(errorResponse.error);
            }
        });
    }
}
exports.userController = new UserController();
