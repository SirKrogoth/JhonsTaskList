import { ObjectId } from "mongodb";

export default interface iUser{
    _id: ObjectId;
    usuario: string;
    senha: string;
}