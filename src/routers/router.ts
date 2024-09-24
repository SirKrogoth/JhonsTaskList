import { Router } from 'express';
import taskController from '../controllers/taskController';
import { validateTaskSchema } from './middlewares/validateSchemasMiddleware';

const router = Router();

router.post('/task', validateTaskSchema, taskController.insertOneTask);

router.get('/removeTaskByTitle/:title', taskController.removeOneTaskByTitle);

router.delete('/removeTaskByID/:id', taskController.removeTaskByID);

export default router;