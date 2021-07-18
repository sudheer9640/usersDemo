"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addResponseHeaders = void 0;
const utilities_1 = require("./utils/utilities");
const path_1 = require("path");
const envConfig_1 = require("./config/envConfig");
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
const sendErrorResponseBack = (response, statusCode, error) => {
    const errorResponse = utilities_1.buildErrorResponse(statusCode, error.errorRes, error.errorName, error.errorReason);
    response.status(statusCode).send(errorResponse);
};
