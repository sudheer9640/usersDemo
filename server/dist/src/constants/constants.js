"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_MANDATORY_PARAMS = exports.constants = void 0;
exports.constants = {
    LOCALHOST_URL: ['http://localhost:4200'],
    SALT_VALUE: 'hmm ths is a dangrous secrte'
};
exports.REQ_MANDATORY_PARAMS = {
    login: ['email', 'password'],
    register: ['email', 'password', 'phoneNumber', 'role']
};
