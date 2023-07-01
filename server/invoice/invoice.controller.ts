import { RequestHandler } from 'express';
import InvoiceModel from './invoice.model';
import { ErrorResponse } from '../middlewares/errorHandler';
import { authenticate } from '../middlewares/authenticate';
import router from './invoice.routes';
import { getUserIdByToken } from '../utils/helpers';
import UserModel from '../user/user.model';

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const userEmail = await getUserIdByToken(req);

    const invoice = await InvoiceModel.find(
      { customerName: userEmail },
      'id date numberField customerName productName productQuantity productPrice totalInvoiceAmount'
    );

    res.status(200).json({ status: 'success', invoice, count: invoice.length });
  } catch (error) {
    next(error);
  }
};

const getById: RequestHandler = async (req, res, next) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);

    if (!invoice) {
      return next(new ErrorResponse('Invoice not found', 404));
    }
    res.status(200).json({ status: 'success', invoice });
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    const userEmail = await getUserIdByToken(req);

    const newInvoice = new InvoiceModel({
      customerName: userEmail,
      ...req.body,
    });
    const saveInvoice = await newInvoice.save();

    res.status(201).json({ status: 'success', invoice: saveInvoice });
  } catch (error) {
    next(error);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: 'success', invoice: updatedInvoice });
  } catch (error) {
    next(error);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    await InvoiceModel.findByIdAndRemove(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const invoiceController = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default invoiceController;
