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
exports.userService = void 0;
const mongoClient_1 = require("../mongoDb/mongoClient");
const user_model_1 = require("../mongoDb/models/user.model");
class UserService {
    constructor() {
        this.getAllUsers = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield mongoClient_1.mongoClient.find(user_model_1.User);
                if (users) {
                    return this.sortUsers(users);
                }
                else {
                    throw false;
                }
            }
            catch (err) {
                throw err;
            }
        });
        this.getUser = (req) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield mongoClient_1.mongoClient.findById(user_model_1.User, id);
                if (user) {
                    return user;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    sortUsers(users) {
        return users.sort((u1, u2) => (u1.name > u2.name ? 1 : -1));
    }
    ;
}
exports.userService = new UserService();
