import iTask from '../interfaces/iTask';
const database = require('../../config/database');
import { ObjectId } from 'mongodb';


async function insertOneTask(task: iTask){
    const db = await database.connect(); 

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).insertOne(task);

    database.disconnect();

    return result;
}

async function removeOneTaskByTitle(title: string){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).deleteOne({
        title: title
    });

    database.disconnect();

    return result;
}

async function removeTaskByID(id: ObjectId){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).deleteOne({
        _id: id
    });

    database.disconnect();

    return result;
}

async function listAllTasks(){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).find({}).toArray();

    database.disconnect();

    return result;
}

async function listTaskById(id: ObjectId){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).findOne({
        _id: id
    });

    database.disconnect();

    return result;
}

async function putTaskById(id: ObjectId, task: iTask){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).updateOne(
        { _id: id },
        { $set: task }
    );
    database.disconnect();

    return result;
}

async function findByTitle(title: string){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).findOne({
        title: title
    });

    database.disconnect();

    return result;
}

async function findOpenTasks(){
    const db = await database.connect();

    const result = await db.collection(process.env.COLLECTION_TASK_NAME).find({
        completed: false
    }).toArray();

    database.disconnect();

    return result;
}

export default {
    insertOneTask,
    removeOneTaskByTitle,
    removeTaskByID,
    listAllTasks,
    listTaskById,
    putTaskById,
    findByTitle,
    findOpenTasks
}