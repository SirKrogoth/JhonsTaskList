import {jest, describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import app from '../../../src/app';
import request from 'supertest';
import iTask from '../../../src/models/interfaces/iTask';
import taskRepository from '../../../src/models/repository/taskRepository';
import { ObjectId } from 'mongodb';

let deletedId: ObjectId; 
let deletedIDNotFound: ObjectId = new ObjectId('507f1f77bcf86cd799439011');

beforeAll(async () => {
    const deletedTask: iTask = {
        title: "Teste Title Deleted",
        description: "Teste descrição Deleted",
        completed: false
    }

    const result = await taskRepository.insertOneTask(deletedTask);
    deletedId = result.insertedId;
});

describe('Testando rota /task do taskController.', () => {
    it('POST /task - Deverá retornar 201 CREATED', async () => {
        const newTask = {
            title: "TESTE TITLE 01.01",
            description: "TESTE DESCRIPTION 01.01",
            completed: false
        }

        const result = await request(app)
            .post('/task')
            .send(newTask)
            .set('Accept', 'application/json');    

        //verificar se o status retornado é 201
        expect(result.status).toBe(201);
    });

    it('POST /task - sem title - Deverá retornar 404 BAD REQUEST', async () => {
        const newTask = {
            description: "TESTE DESCRIPTION 01.01",
            completed: false
        }

        const result = await request(app)
            .post('/task')
            .send(newTask)
            .set('Accept', 'application/json');    

        //verificar se o status retornado é 201
        expect(result.status).toBe(422);
    });
    
    it('POST /task - sem description - Deverá retornar 404 BAD REQUEST', async () => {
        const newTask = {
            title: "TESTE TITLE 01.01",            
            completed: false
        }

        const result = await request(app)
            .post('/task')
            .send(newTask)
            .set('Accept', 'application/json');    

        expect(result.status).toBe(422);
    });

    it('POST /task - Informação a mais - Deverá retornar 404 BAD REQUEST', async () => {
        const newTask = {
            description: "TESTE DESCRIPTION 01.01",
            title: "TESTE TITLE 01.01",            
            completed: false,
            teste01: "teste"
        }

        const result = await request(app)
            .post('/task')
            .send(newTask)
            .set('Accept', 'application/json');    

        expect(result.status).toBe(422);
    });

    it('GET /removeTaskByTitle - Deverá retornar 200 OK', async () => {
        const title = 'TESTE TITLE 01.01';

        const result = await request(app)
            .get('/removeTaskByTitle/' + title);

        expect(result.status).toEqual(200);
    });
});

describe('DELETE /removeTaskByID', () => {
    it('DELETE /removeTaskById - Deverá retornar 200 OK', async () => {
        const result = await request(app)
            .delete(`/removeTaskById/${deletedId}`);

        expect(result.status).toBe(200);
    });

    it('DELETE /removeTaskById - Deverá retornar 404 NOT FOUND', async () => {
        const result = await request(app)
            .delete(`/removeTaskById/${deletedIDNotFound}`);

        expect(result.status).toBe(404);
    });
});