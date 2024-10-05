import { Router } from 'express';
import taskController from '../controllers/taskController';
import { validateTaskSchema } from './middlewares/validateSchemasMiddleware';
import { validateAuth } from './middlewares/validateAuth';
import accountController from '../controllers/accountController';

const router = Router();

router.post('/task', validateAuth, validateTaskSchema, taskController.insertOneTask);
router.post('/login', accountController.findByUser);

router.get('/removeTaskByTitle/:title', validateAuth, taskController.removeOneTaskByTitle);
router.get('/tasks', validateAuth , taskController.listAllTasks);
router.get('/task/:id', validateAuth, taskController.listTaskById);
router.get('/findByTitle/:title', validateAuth, taskController.findByTitle);
router.get('/findOpenTasks', validateAuth, taskController.findOpenTasks);

router.delete('/removeTaskByID/:id', validateAuth, taskController.removeTaskByID);

router.put('/putTask/:id', validateAuth, taskController.putTaskById);

export default router;