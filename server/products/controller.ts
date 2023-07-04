import { RequestHandler } from 'express';
import { ErrorResponse } from '../middlewares/errorHandler';
import { authenticate } from '../middlewares/authenticate';
import { getUserIdByToken } from '../utils/helpers';
import UserModel from '../user/user.model';
import ProductsModel from './model';

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductsModel.find({});

    res
      .status(200)
      .json({ status: 'success', products, count: products.length });
  } catch (error) {
    next(error);
  }
};

const getById: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductsModel.findById(req.params.id);

    if (!products) {
      return next(new ErrorResponse('Products not found', 404));
    }
    res.status(200).json({ status: 'success', products });
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    const newProducts = new ProductsModel({
      ...req.body,
    });
    const saveProducts = await newProducts.save();

    res.status(201).json({ status: 'success', products: saveProducts });
  } catch (error) {
    next(error);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const updatedProducts = await ProductsModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: 'success', products: updatedProducts });
  } catch (error) {
    next(error);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    await ProductsModel.findByIdAndRemove(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const productsController = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default productsController;
