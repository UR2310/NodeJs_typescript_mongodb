/** Schema to validate signUp, login, resetPassword APIs. */ 
export const userSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string', minLength: 4, maxLength: 20 }
    },
    required: ['email', 'password'],
    additionalProperties: false
};