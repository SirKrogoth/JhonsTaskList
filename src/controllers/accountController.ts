import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import iUser from '../models/interfaces/iUser';
import accountRepository from '../models/repository/accountRepository';
import auth from '../secure/auth';


async function findByUser(req: Request, res: Response, next: any){
    try {
        const user = req.body as iUser;
    
        const verifyUser: iUser = await accountRepository.findByUser(user);

        if(verifyUser !== null){
            if(verifyUser.senha === user.senha){
                console.log(verifyUser);
                console.log(verifyUser._id);
                if(verifyUser._id){
                    console.log("FOI");
                    //Criar token
                    const token = await auth.sign(verifyUser._id);

                    return res.json({
                        auth: true,
                        token
                    });
                }                
            }
        }

        res.status(StatusCodes.BAD_REQUEST).end();
    } catch (error) {
        console.error("Erro na function findByUser accountController. Message: " + error);
        res.status(StatusCodes.BAD_REQUEST).json(error).end();
    }
}



export default {
    findByUser
}