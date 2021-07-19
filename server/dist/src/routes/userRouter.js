"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userController_1 = require("../controllers/userController");
const middleware_1 = require("../middleware");
const constants_1 = require("../constants/constants");
const userRouter = express_1.Router();
userRouter.get('/', middleware_1.isAuthorized([constants_1.roles.ADMIN]), passport_1.default.authenticate('jwt', { session: false }), userController_1.userController.getUsers);
userRouter.get('/:id', middleware_1.isAuthorized([constants_1.roles.EMPLOYEE, constants_1.roles.ADMIN]), passport_1.default.authenticate('jwt', { session: false }), userController_1.userController.getUser);
exports.default = userRouter;
