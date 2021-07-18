"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuccessResponse = exports.buildErrorResponse = void 0;
const buildErrorResponse = (errorObj, code, errorMessage, errorDescription) => {
    const { name, message, body, statusCode } = !!errorObj && errorObj;
    const { error, error_description } = !!body && body;
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
        statusCode,
        body: {
            message,
            data
        }
    };
};
exports.buildSuccessResponse = buildSuccessResponse;
