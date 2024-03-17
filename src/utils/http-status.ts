import { Response } from 'express';
// interface response {
//     success: boolean;
//     message: string;
//     data: any;
//     token: any
// }

/** Send success response */ 
export const sendOkResponse = (res: Response, message: string, data: unknown = null, token: unknown = null) => {
    const resObject = { success: true, message, data, token };
    res.status(200).json(resObject);
}

/** Send error response */ 
export const sendBadRequestResponse = (res: Response, message: string = "Something went wrong, please try again later.", data: unknown = null) => {
    const resObject = { success: false, message, data };
    res.status(400).json(resObject);
}

/** Send error response */ 
export const sendErrorResponse = (res: Response, message: string = "Something went wrong, please try again later.", data: unknown = null) => {
    const resObject = { success: false, message, data };
    res.status(400).json(resObject);
}

/** Send unauthorized response */ 
export const sendUnAuthorizedResponse = (res: Response, message: string = "User not authenticated.", data: unknown = null) => {
    const resObject = { success: false, message, data };
    res.status(401).json(resObject);
}

/** Send not found response */ 
export const sendNotFoundResponse = (res: Response, message: string, data: unknown = null) => {
    const resObject = { success: false, message, data };
    res.status(404).json(resObject);
}

/** Send conflict error response */ 
export const sendConflictErrorResponse = (res: Response, message: string, data: unknown = null) => {
    const resObject = { success: false, message, data };
    res.status(409).json(resObject);
}