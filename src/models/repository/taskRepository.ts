import iTask from '../interfaces/iTask';

const database = require('../../config/database');
import { ObjectId } from 'mongodb';


async function insertOneTask(task: iTask){
    const db = await database.connect(); 

    const result = await db.collection(process.env.COLLECTION_NAME).insertOne(task);

    database.disconnect();

    return result;
}

async function removeOneTaskByTitle(title: string){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_NAME).deleteOne({
        title: title
    });

    database.disconnect();

    return result;
}

async function removeTaskByID(id: ObjectId){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_NAME).deleteOne({
        _id: id
    });

    database.disconnect();

    return result;
}

export default {
    insertOneTask,
    removeOneTaskByTitle,
    removeTaskByID
}