import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import iTask from '../models/interfaces/iTask';
import taskRepository from '../models/repository/taskRepository';
import { ObjectId } from 'mongodb';

async function insertOneTask(req: Request, res: Response, next: any){
    try {
        const newTask = req.body as iTask;

        const result = await taskRepository.insertOneTask(newTask);

        if(!result) return res.status(StatusCodes.BAD_REQUEST).end();

        res.status(StatusCodes.CREATED).json(result).end();
    } catch (error) {
        console.error("Erro na function insertOneTask taskController. Message: " + error);
        res.status(StatusCodes.BAD_REQUEST).json(error).end();
    }
}

async function removeOneTaskByTitle(req: Request, res: Response, next: any){
    try {
        const title = req.params.title as string;

        const result = await  taskRepository.removeOneTaskByTitle(title);

        if(!result || result.deletedCount === 0) return res.status(StatusCodes.NOT_FOUND).end();

        res.status(StatusCodes.OK).end();
    } catch (error) {
        console.error("Erro na function removeOneTaskByTitle taskController. Message: " + error);
        res.status(StatusCodes.BAD_REQUEST).json(error).end();
    }
}

async function removeTaskByID(req: Request, res: Response, next: any){
    try {
        const id = req.params.id as string;

        const idDeletedObjectId = new ObjectId(id);

        const result = await taskRepository.removeTaskByID(idDeletedObjectId);

        if(!result || result.deletedCount === 0) return res.status(StatusCodes.NOT_FOUND).end();
        
        res.status(StatusCodes.OK).end();

    } catch (error) {
        console.error("Erro na function removeTaskByID taskController. Message: " + error);
        res.status(StatusCodes.BAD_REQUEST).json(error).end();
    }
}

async function listAllTasks(req: Request, res: Response, next: any){
    try {
        const result = await taskRepository.listAllTasks();

        if(!result) return res.status(StatusCodes.NOT_FOUND).end();

        res.status(StatusCodes.OK).json(result).end();
    } catch (error) {
        console.error("Erro na function listAllTasks taskController. Message: " + error);
        res.status(StatusCodes.BAD_REQUEST).json(error).end();
    }
}

async function listTaskById(req: Request, res: Response, next: any){
    try {
        const id = req.params.id as string; 

        const findById = new ObjectId(id);

        const result = await taskRepository.listTaskById(findById);

        if(!result || result.deletedCount === 0) return res.status(StatusCodes.NOT_FOUND).end();

        res.status(StatusCodes.OK).json(result).end();
    } catch (error) {
        console.error("Erro na function listTaskById taskController. Message: " + error);
        res.status(StatusCodes.BAD_REQUEST).json(error).end();
    }
}

async function putTaskById(req: Request, res: Response, next: any){
    try {
        const task: iTask = req.body as iTask;
        const id: ObjectId = new ObjectId(req.params.id as string);

        console.log(task);

        const result = await taskRepository.putTaskById(id, task);

        if(result.matchedCount === 0){
            return res.status(StatusCodes.BAD_REQUEST).json(result).end();
        }

        return res.status(StatusCodes.OK).json(result).end();

    } catch (error) {
        console.error("Erro na function putTaskById taskController. Message: " + error);
        res.status(StatusCodes.BAD_REQUEST).json(error).end();
    }
}

export default {
    insertOneTask,
    removeOneTaskByTitle,
    removeTaskByID,
    listAllTasks,
    listTaskById,
    putTaskById
}