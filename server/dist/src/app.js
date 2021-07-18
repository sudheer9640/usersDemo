"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// NPM Module imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
// Dev imports
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const connection_1 = require("./mongoDb/connection");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const middleware_1 = require("./middleware");
const envConfig_1 = require("./config/envConfig");
require("./config/passport");
const app = express_1.default();
// mount json form parser
app.use(body_parser_1.default.json());
// mount query string parser
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(helmet_1.default());
app.all('*', middleware_1.addResponseHeaders);
// Adding the routes
app.use('/auth', authRouter_1.default);
app.use('/users', userRouter_1.default);
/* It removes 'X-Powered-By: Express' header to avoid disclosure the app engine */
app.disable('x-powered-by');
app.set('port', envConfig_1.envConstants.PORT);
app.get('/healthcheck', (req, res) => {
    res.send('Server Online');
});
// connect to mongodb
connection_1.connectToDB();
exports.default = app;
