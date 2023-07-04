import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import productsController from './controller';
import { validateProductsCreate, validateProductsUpdate } from './schema';
const router = Router();

// authenticate
router.use(authenticate);

router
  .route('/')
  .get(productsController.getAll)
  .post(validateProductsCreate, productsController.create);

router
  .route('/:id')
  .get(productsController.getById)
  .put(validateProductsUpdate, productsController.update)
  .delete(productsController.remove);

export default router;
