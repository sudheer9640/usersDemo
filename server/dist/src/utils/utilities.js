"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuccessResponse = exports.buildErrorResponse = void 0;
const path_1 = require("path");
const fileName = path_1.basename(__filename);
const buildErrorResponse = (errorObj, code, errorMessage, errorDescription) => {
    const { name, message, body, statusCode } = !!errorObj && errorObj;
    let { error, error_description } = !!body && body;
    return {
        statusCode: code || statusCode || 500,
        error: {
            systemMessage: errorMessage || name || error || 'INTERNAL_SERVER_ERROR',
            userMessage: errorDescription || message || error_description || 'Internal server error'
        }
    };
};
exports.buildErrorResponse = buildErrorResponse;
const buildSuccessResponse = (statusCode, message, data) => {
    return {
        statusCode: statusCode,
        body: {
            message: message,
            data: data
        }
    };
};
exports.buildSuccessResponse = buildSuccessResponse;
