import {NextFunction, Request, Response} from 'express';
import {buildErrorResponse} from './utils/utilities';
import {basename} from 'path';
import jwt from 'jsonwebtoken';
import {envConstants} from "./config/envConfig";
import {REQ_MANDATORY_PARAMS} from "./constants/constants";
import {User} from "./mongoDb/models/user.model";

const fileName = basename(__filename);

export const addResponseHeaders = (req: Request, res: Response, next: NextFunction) => {
    const origin: string = req.headers.origin || req.headers.refferer as string;
    if (envConstants.ALLOWED_DOMAINS_WHITE_LIST.includes(origin)) {
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
    } else {
        return next();
    }
};


export const isAuthorized = (roles: string[]) => {
    const unAuthorizedErr = buildUnauthorizedError();
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers.authorization) {
            return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
        }
        const token = req.headers.authorization.split(' ')[1];
        return jwt.verify(token, envConstants.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
            }
            const userId = decoded._id;
            return User.findById(userId, (userErr: any, user: any) => {
                if (userErr || !user) {
                    return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
                }
                if (roles) {
                    if (roles.indexOf(user.role) > -1) {
                        return next();
                    } else {
                        return res.status(unAuthorizedErr.statusCode).send(unAuthorizedErr.error);
                    }
                }
                return next();
            });
        });
    };
};

export const checkReqBodyParams = (req: Request, res: Response, next: NextFunction) => {
    const reqUrl = req.url.replace('/', '').trim();
    if (REQ_MANDATORY_PARAMS[reqUrl]) {
        const missingParams = [];
        const mandatoryParams: string[] = REQ_MANDATORY_PARAMS[reqUrl];
        for (const param of mandatoryParams) {
            if (!req.body[param]) {
                missingParams.push(param);
            }
        }
        if (missingParams.length) {
            const missingParamsString = missingParams.join(' ,');
            const errorRes = buildErrorResponse(null, 400, 'Invalid Request', `Request is missing ${missingParamsString}`)
            return res.status(400).send(errorRes);
        } else {
            return next();
        }
    }
};

const buildUnauthorizedError = (err?: any) => {
    const error = buildErrorResponse(err, 401, 'Unauthorized', 'Access Forbidden')
    return error;
}
