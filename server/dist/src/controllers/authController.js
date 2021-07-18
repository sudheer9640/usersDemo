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
exports.authController = void 0;
const authService_1 = require("../services/authService");
const utilities_1 = require("../utils/utilities");
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userRegistered = yield authService_1.authService.register(req);
                if (userRegistered) {
                    const response = {
                        statusCode: 200,
                        message: 'User saved'
                    };
                    const standardResponse = utilities_1.buildSuccessResponse(response.statusCode, response.message);
                    res.status(standardResponse.statusCode).send(standardResponse.body);
                }
                else {
                    const errResponse = utilities_1.buildErrorResponse(userRegistered, 400, 'AUTH_ERROR', 'Unable to register user');
                    res.status(errResponse.statusCode).send(errResponse.error);
                }
            }
            catch (err) {
                const errorResponse = utilities_1.buildErrorResponse(err);
                res.status(errorResponse.statusCode).send(errorResponse.error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userLoginToken = yield authService_1.authService.login(req);
                if (userLoginToken) {
                    // console.log('userLoggedIn');
                    const response = {
                        statusCode: 200,
                        message: 'User Logged In'
                    };
                    const standardResponse = utilities_1.buildSuccessResponse(response.statusCode, response.message);
                    res.setHeader('Authorization', userLoginToken);
                    res.status(standardResponse.statusCode).send(standardResponse.body);
                }
                else {
                    console.log('user not logged in', userLoginToken);
                    const errResponse = utilities_1.buildErrorResponse(userLoginToken, 400, 'AUTH_ERROR', 'Unable to login user');
                    res.status(errResponse.statusCode).send(errResponse.error);
                }
            }
            catch (error) {
                console.log('login error', error);
                const errorResponse = utilities_1.buildErrorResponse(error);
                res.status(errorResponse.statusCode).send(errorResponse.error);
            }
        });
    }
}
exports.authController = new AuthController();
