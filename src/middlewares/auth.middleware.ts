import { NextFunction, Request, Response } from 'express';
import { sendUnAuthorizedResponse, sendBadRequestResponse } from '../utils/http-status';
import env from '../utils/validate-env';
import jwt from 'jwt-simple';
import userModel from '../models/user.model';

/** Check user authentication using session */
export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Set token in header
        const token: any = req.header("token");
        if(!token) return sendBadRequestResponse(res, "Invalid token.");        

        // Decode token and fetch token data
        const decodeData = jwt.decode(token, env.SESSION_SECRET, true);
        if(!decodeData) return sendBadRequestResponse(res, "Invalid token.");

        // Check if user with same id or not.
        const user = await userModel.findOne({ _id: decodeData.id });
        if(!user) return sendBadRequestResponse(res, "Invalid token.");

        // Token response
        res.locals.auth = {
            success: true,
            message: "Valid token.",
            data: user,
            tokenData: decodeData
        }
        
        next();
    } catch(err) {
        console.log("Error: ", err);
        sendUnAuthorizedResponse(res);
    }
};