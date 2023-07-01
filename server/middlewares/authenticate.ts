import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorResponse } from './errorHandler';
import UserModel from '../user/user.model';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate: RequestHandler<{ user: string }> = async (
  req,
  res,
  next
) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer'))
      return next(new ErrorResponse('Unauthorized', 401));

    const token = authHeader.split(' ')[1];

    if (!token) return next(new ErrorResponse('Unauthorized', 401));

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const foundUser = await UserModel.findById(decoded.id);

    if (!foundUser) throw new ErrorResponse('Unauthorized', 401);

    // req.user = foundUser.id;

    next();
  } catch (err) {
    next(err);
  }
};
