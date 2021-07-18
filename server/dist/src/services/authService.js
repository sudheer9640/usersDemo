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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_model_1 = require("../mongoDb/models/user.model");
const mongoClient_1 = require("../mongoDb/mongoClient");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../config/envConfig");
class AuthService {
    constructor() {
        this.register = (req) => __awaiter(this, void 0, void 0, function* () {
            const { name, phoneNumber, email, password, role } = req.body;
            try {
                const userData = {
                    name,
                    phoneNumber,
                    email,
                    role
                };
                userData.password = user_model_1.generateHash(password);
                const userSaved = yield mongoClient_1.mongoClient.save(user_model_1.User, userData);
                if (userSaved) {
                    return true;
                }
                else {
                    throw userSaved;
                }
            }
            catch (err) {
                throw err;
            }
        });
        this.login = (loginRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = loginRequest.body;
                try {
                    const query = {
                        email
                    };
                    // console.log('login service query', query)
                    const user = yield mongoClient_1.mongoClient.findOne(user_model_1.User, query);
                    if (!user) {
                        throw this.buildErr("User doesn't exists");
                    }
                    else if (!user_model_1.validPassword(password, user.password)) {
                        throw this.buildErr('Incorrect password');
                    }
                    else {
                        const userJson = {
                            _id: user._id,
                            role: user.role,
                            fullName: user.fullName,
                            instId: user.instId
                        };
                        const token = jsonwebtoken_1.default.sign(userJson, envConfig_1.envConstants.JWT_SECRET, {
                            expiresIn: 604800 // 1 week
                        });
                        return token;
                    }
                }
                catch (err) {
                    throw err;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    buildErr(errMessage) {
        const error = new Error(errMessage);
        error.statusCode = 400;
        return error;
    }
}
exports.authService = new AuthService();
