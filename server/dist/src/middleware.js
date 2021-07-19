"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkReqBodyParams = exports.isAuthorized = exports.addResponseHeaders = void 0;
const utilities_1 = require("./utils/utilities");
const path_1 = require("path");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("./config/envConfig");
const constants_1 = require("./constants/constants");
const user_model_1 = require("./mongoDb/models/user.model");
const fileName = path_1.basename(__filename);
const addResponseHeaders = (req, res, next) => {
    const origin = req.headers.origin || req.headers.refferer;
    if (envConfig_1.envConstants.ALLOWED_DOMAINS_WHITE_LIST.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-Authorization,transId, Content-Type');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    res.header('ORIG_SERVER', '');
    if (req.method === 'OPTIONS') {
        return res.end();
    }
    else {
        return next();
    }
};
exports.addResponseHeaders = addResponseHeaders;
const isAuthorized = (roles) => {
    const unAuthorizedErr = buildUnauthorizedError();
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
        }
        const token = req.headers.authorization.split(' ')[1];
        return jsonwebtoken_1.default.verify(token, envConfig_1.envConstants.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
            }
            const userId = decoded._id;
            return user_model_1.User.findById(userId, (userErr, user) => {
                if (userErr || !user) {
                    return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
                }
                if (roles) {
                    if (roles.indexOf(user.role) > -1) {
                        return next();
                    }
                    else {
                        return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
                    }
                }
                return next();
            });
        });
    };
};
exports.isAuthorized = isAuthorized;
const checkReqBodyParams = (req, res, next) => {
    const reqUrl = req.url.replace('/', '').trim();
    if (constants_1.REQ_MANDATORY_PARAMS[reqUrl]) {
        const missingParams = [];
        const mandatoryParams = constants_1.REQ_MANDATORY_PARAMS[reqUrl];
        for (const param of mandatoryParams) {
            if (!req.body[param]) {
                missingParams.push(param);
            }
        }
        if (missingParams.length) {
            const missingParamsString = missingParams.join(' ,');
            const errorRes = utilities_1.buildErrorResponse(null, 400, 'Invalid Request', `Request is missing ${missingParamsString}`);
            return res.status(400).send(errorRes);
        }
        else {
            return next();
        }
    }
};
exports.checkReqBodyParams = checkReqBodyParams;
const buildUnauthorizedError = (err) => {
    const error = utilities_1.buildErrorResponse(err, 401, 'Unauthorized', 'Access Forbidden');
    return error;
};
