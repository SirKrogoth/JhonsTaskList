import { describe, expect, it, beforeAll } from '@jest/globals';
import app from '../../../src/app';
import request from 'supertest';
import iTask from '../../../src/models/interfaces/iTask';
import taskRepository from '../../../src/models/repository/taskRepository';
import { ObjectId } from 'mongodb';

let deletedId1: ObjectId; 
let deletedIDNotFound: ObjectId = new ObjectId('507f1f77bcf86cd799439011');

beforeAll(async () => {
    const deletedTask: iTask = {
        title: "Teste Title Deleted",
        description: "Teste descrição Deleted",
        completed: false
    }

    const result = await taskRepository.insertOneTask(deletedTask);
    deletedId1 = result.insertedId;
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

        expect(result.status).toBe(200);
    });
});

describe('DELETE /removeTaskByID', () => {
    it('DELETE /removeTaskById - Deverá retornar 200 OK', async () => {
        const result = await request(app)
            .delete(`/removeTaskById/${deletedId1}`);

        expect(result.status).toBe(200);
    });

    it('DELETE /removeTaskById - Deverá retornar 404 NOT FOUND', async () => {
        const result = await request(app)
            .delete(`/removeTaskById/${deletedIDNotFound}`);

        expect(result.status).toBe(404);
    });
});

describe('GET /tasks', () => {
    it('GET /tasks - Deverá retornar 200 OK', async () => {
        const result = await request(app)
            .get('/tasks')
            .set('Accept', 'application/json'); 
        
            expect(result.status).toBe(200);
    });
});

describe('Testando a rota que irá retornar uma task através do seu ID', () => {
    it('GET /task/:id - Deverá retornar 200 OK', async () => {
        const result = await request(app)
            .get(`/task/66f0bcf239b045cb6d87e1f8`)
            .set('Accept', 'application/json'); 
        
            expect(result.status).toBe(200);
    });
});

describe('Testando a rota que irá atualizar uma task através de seu ID', () => {
   it('PUT /putTask - Deverá retornar 200 OK', async () => {
        const newTask: iTask = {
            title: 'Title alterado',
            description: 'Description alterado',
            completed: true
        }

        const result = await request(app)
            .put('/putTask/66f0bcf239b045cb6d87e1f8')
            .send({
                title: newTask.title,
                description: newTask.description,
                completed: newTask.completed
            })
            .set('Accept', 'application/json');

            expect(result.status).toBe(200);
   });
});

describe('Testando uma busca por título.', () => {
    it('GET /findByTitle/:title - Deverá retornar 200 OK', async () => {
        const result = await request(app)
            .get(`/findByTitle/Enviar fone para Monique`)
            .set('Accept', 'application/json');

            expect(result.status).toBe(200);
    });
})