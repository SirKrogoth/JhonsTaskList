import { ObjectId } from "mongodb";

export default interface iTask{
    id?: ObjectId;
    title: string;
    description: string;
    completed: boolean;
}