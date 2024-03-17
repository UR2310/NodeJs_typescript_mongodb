import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { sendBadRequestResponse, sendConflictErrorResponse, sendOkResponse, sendUnAuthorizedResponse } from '../utils/http-status';
import env from '../utils/validate-env';

/** POST API: Signup for a new user account */
export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if user with the same email address already exists or not.
        const existingUser = await UserModel.findOne({ email, isDeleted: false }).exec();
        if(existingUser) return sendConflictErrorResponse(res, 'A user with this email address already exists. Please log in instead.');
        
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user 
        const user = await UserModel.create({
            email,
            password: hashedPassword
        });

        sendOkResponse(res, 'An account created successfully.',user);
        
    } catch(err) {
        console.log('Error: ', err);
        sendBadRequestResponse(res);
    }
};

/** POST API: Login with the email and password into the system */
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find the user with the email provided in request body
        const user = await UserModel.findOne({ email, isDeleted: false }).select("+password").exec();
        if(!user) return sendUnAuthorizedResponse(res, "Invalid credentials.");

        // Compare user password with the password provided in request body
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) return sendUnAuthorizedResponse(res, "Invalid credentials.");

        const tokenData = {
            id: user._id,
            email: user.email
        }
        // Create token
        const token = jwt.encode(tokenData, env.SESSION_SECRET, 'HS256');
        
        sendOkResponse(res, "Logged in successfully.", user, token);
    } catch(err) {
        console.log('Error: ', err);
        sendBadRequestResponse(res);
    }
};