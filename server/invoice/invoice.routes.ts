import { Router } from 'express';
import invoiceController from './invoice.controller';
import { validateInvoiceCreate, validateInvoiceUpdate } from './invoice.schema';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

// authenticate
router.use(authenticate);

router
  .route('/')
  .get(invoiceController.getAll)
  .post(validateInvoiceCreate, invoiceController.create);

router
  .route('/:id')
  .get(invoiceController.getById)
  .put(validateInvoiceUpdate, invoiceController.update)
  .delete(invoiceController.remove);

export default router;
