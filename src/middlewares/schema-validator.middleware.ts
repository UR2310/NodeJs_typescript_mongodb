import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/http-status';

import Ajv from 'ajv';
const ajv = new Ajv();

/** Validate schemas and missing params */
export const validateSchema = (schema: any, type: 'body' | 'query') => {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        const valid = validate(req[type]);
        if(!valid) return sendErrorResponse(res, 'Incorrect or missing parameters.', validate.errors);

        next();
    };
};