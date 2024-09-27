import { Router } from 'express';
import taskController from '../controllers/taskController';
import { validateTaskSchema } from './middlewares/validateSchemasMiddleware';

const router = Router();

router.post('/task', validateTaskSchema, taskController.insertOneTask);

router.get('/removeTaskByTitle/:title', taskController.removeOneTaskByTitle);
router.get('/tasks', taskController.listAllTasks);
router.get('/task/:id', taskController.listTaskById);
router.get('/findByTitle/:title', taskController.findByTitle);

router.delete('/removeTaskByID/:id', taskController.removeTaskByID);

router.put('/putTask/:id', taskController.putTaskById);

export default router;