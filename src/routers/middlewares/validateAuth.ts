import { Request, Response } from 'express';
import auth from '../../secure/auth';
import { StatusCodes } from 'http-status-codes';

async function validateAuth(req: Request, res: Response, next: any){
    try {
        const token = req.headers['x-access-token'] as string;
        if(!token) return res.status(StatusCodes.UNAUTHORIZED).end();

        const payload = await auth.verify(token);
        if(!payload) return res.status(StatusCodes.UNAUTHORIZED).end();

        res.locals.payload = payload;

        next();

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.UNAUTHORIZED).end();
    }
}

export {
    validateAuth
}