import { Router } from 'express';
import * as TasksController from './tasks.controller';
import authorizationMiddleware from '../../middleware/authorization'

const router = Router();

router.use(authorizationMiddleware);

router
  .post('/tasks', TasksController.createTasks)
  .get('/tasks', TasksController.getTasks)

export default router;
