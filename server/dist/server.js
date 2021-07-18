"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./src/app"));
const serverHandlers_1 = require("./src/utils/serverHandlers");
const envConfig_1 = require("./src/config/envConfig");
const port = envConfig_1.envConstants.PORT;
const startServer = () => {
    const server = http_1.default.createServer(app_1.default);
    server.listen(port);
    server.on('error', serverHandlers_1.onError(port));
    server.on('listening', serverHandlers_1.onListening(server));
};
startServer();
