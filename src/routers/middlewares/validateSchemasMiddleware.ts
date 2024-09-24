import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { newTaskSchema } from '../../models/schemas/newTaskSchema';

function validateTaskSchema(req: Request, res: Response, next: any){
    const { error } = newTaskSchema.validate(req.body);

    if(error == null) return next();

    const { details } = error;
    const message = details.map(item => item.message).join(',');

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(message).end();
}

export {
    validateTaskSchema
}