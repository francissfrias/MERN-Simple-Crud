import { RequestHandler } from 'express';
import { ErrorResponse } from '../middlewares/errorHandler';
import UserModel from './user.model';
import { hashPassword } from '../utils/helpers';

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.find({});

    res.status(200).json({ status: 'success', user, count: user.length });
  } catch (error) {
    next(error);
  }
};

const getById: RequestHandler = async (req, res, next) => {
  try {
    const founduser = await UserModel.findById(req.params.id, 'id email');

    if (!founduser) {
      return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json({ status: 'success', founduser });
  } catch (error) {
    next(error);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return next(new ErrorResponse('Email already exists', 404));
    }

    // Create the hashed password
    const hashedPassword: string = await hashPassword(password);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    // Exclude the `password` field from the returned user
    const { password: _, ...userToReturn } = newUser.toObject();

    res.status(201).json({ status: 'success', user: userToReturn });
  } catch (error) {
    next(error);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const updateduser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: 'success', user: updateduser });
  } catch (error) {
    next(error);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    await UserModel.findByIdAndRemove(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const userController = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default userController;
