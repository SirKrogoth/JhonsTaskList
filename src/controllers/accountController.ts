import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import iUser from '../models/interfaces/iUser';
import accountRepository from '../models/repository/accountRepository';
import auth from '../secure/auth';
import logger from '../config/logger';


async function findByUser(req: Request, res: Response, next: any){
    try {
        const user = req.body as iUser;
    
        const verifyUser: iUser = await accountRepository.findByUser(user);

        if(verifyUser !== null){
            if(verifyUser.senha === user.senha){
                if(verifyUser._id){
                    //Criar token
                    const token = await auth.sign(verifyUser._id);

                    return res.json({
                        auth: true,
                        token
                    });
                }                
            }
        }

        logger.warn("Usuário não encontrado.");
        res.status(StatusCodes.UNAUTHORIZED).end();
    } catch (error) {
        logger.error("Erro na function findByUser accountController. Message: " + error);        
        res.status(StatusCodes.UNAUTHORIZED).json(error).end();
    }
}



export default {
    findByUser
}