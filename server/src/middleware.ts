import {NextFunction, Request, Response} from 'express';
import {buildErrorResponse} from './utils/utilities';
import {basename} from 'path';
import {envConstants} from "./config/envConfig";

const fileName = basename(__filename);

export const addResponseHeaders = (req: Request, res: Response, next: NextFunction) => {
  const origin: string = req.headers.origin || req.headers.refferer as string;
  if (envConstants.ALLOWED_DOMAINS_WHITE_LIST.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods','POST, PUT, GET, DELETE, OPTIONS');
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

const sendErrorResponseBack = (response: Response, statusCode: number, error: any) => {
  const errorResponse = buildErrorResponse(statusCode, error.errorRes, error.errorName, error.errorReason);
  response.status(statusCode).send(errorResponse);
};

