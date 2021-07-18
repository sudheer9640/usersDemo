
export const constants = {
    LOCALHOST_URL: ['http://localhost:4200'],
    SALT_VALUE: 'hmm ths is a dangrous secrte'
};

export const REQ_MANDATORY_PARAMS: any = {
    login: ['email', 'password'],
    register: ['email', 'password', 'phoneNumber', 'role']
};
