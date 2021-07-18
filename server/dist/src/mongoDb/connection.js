"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = require("../config/envConfig");
const connectToDB = () => {
    try {
        const mongoOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        mongoose_1.default.connect(envConfig_1.envConstants.MONGO_URI, mongoOptions);
        const conn = mongoose_1.default.connection;
        conn.once('open', () => {
            return;
        });
        conn.on('error', (err) => {
            console.error('There was a db connection error', err.message);
            process.exit(1);
        });
        conn.once('connected', () => {
            console.log('Successfully connected to ' + envConfig_1.envConstants.MONGO_URI);
        });
        conn.once('disconnected', (ev) => {
            console.error('Disconnected from ' + envConfig_1.envConstants.MONGO_URI);
            process.exit(1);
        });
    }
    catch (e) {
        console.log('error connecting to db', e);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
