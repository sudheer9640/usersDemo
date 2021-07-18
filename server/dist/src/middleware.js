"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkReqBodyParams = exports.addResponseHeaders = void 0;
const utilities_1 = require("./utils/utilities");
const path_1 = require("path");
const envConfig_1 = require("./config/envConfig");
const constants_1 = require("./constants/constants");
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
