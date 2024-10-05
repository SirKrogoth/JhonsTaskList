import jwt, { VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/public.key'), 'utf-8');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../../keys/private.key'), 'utf-8');
const jwtAlgorithm = 'RS256';
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
import { ObjectId } from "mongodb";

export type Token = { _id: ObjectId }

async function verify(token: string){
    try {
        const decoded = await decodedToken(token);
        decoded?._id;

        return {
            _id: decoded?._id
        }
    } catch (error) {
        console.error(`Houve um erro no verify: ${error}`);
        return null;
    }
}

async function sign(_id: ObjectId){
    try {
        const token: Token = { _id }

        return jwt.sign(token, privateKey, {
            expiresIn: jwtExpires,
            algorithm: jwtAlgorithm
        });
    } catch (error) {
        console.error(`Houve um erro no sign: ${error}`);
        return null;
    }
}

async function decodedToken(token: string){
    try {
        const decoded: Token = await jwt.verify(token, publicKey, {
            algorithms: [jwtAlgorithm]
        } as VerifyOptions) as Token;

        return decoded;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default {
    decodedToken,
    verify,
    sign
}