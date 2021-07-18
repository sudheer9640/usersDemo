"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRouter = express_1.Router();
authRouter.post('/register', authController_1.authController.register);
authRouter.post('/login', authController_1.authController.login);
exports.default = authRouter;
