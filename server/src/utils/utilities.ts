import {Response} from 'express';
import {basename} from 'path';

const fileName = basename(__filename);

export const buildErrorResponse = (errorObj: any, code?: number, errorMessage?: any, errorDescription?: any): any => {
    const {name, message, body, statusCode} = !!errorObj && errorObj;
    let {error, error_description} = !!body && body;
    return {
        statusCode: code || statusCode || 500,
        error: {
            systemMessage: errorMessage || name || error || 'INTERNAL_SERVER_ERROR',
            userMessage: errorDescription || message || error_description || 'Internal server error'
        }
    }
};

export const buildSuccessResponse = (statusCode: number, message: string, data?: any): any => {
    return {
        statusCode: statusCode,
        body: {
            message: message,
            data: data
        }
    };
};

