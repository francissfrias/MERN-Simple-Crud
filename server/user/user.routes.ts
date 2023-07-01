import { Router } from 'express';
import userController from './user.controller';
import { validateUserCreate, validateUserUpdate } from './user.schema';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

authenticate;
router.use(authenticate);

router
  .route('/')
  .get(userController.getAll)
  .post(validateUserCreate, userController.create);

router
  .route('/:id')
  .get(userController.getById)
  .put(validateUserUpdate, userController.update)
  .delete(userController.remove);

export default router;
