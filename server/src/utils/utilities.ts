
export const buildErrorResponse = (errorObj: any, code?: number, errorMessage?: any, errorDescription?: any): any => {
    const {name, message, body, statusCode} = !!errorObj && errorObj;
    const {error, error_description} = !!body && body;
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
        statusCode,
        body: {
            message,
            data
        }
    };
};

