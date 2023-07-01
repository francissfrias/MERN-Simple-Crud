import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../user/user.model';
import { ErrorResponse } from '../middlewares/errorHandler';
import { RequestHandler } from 'express-serve-static-core';

// for login
type GetSignedTokenArgs = {
  userId: string;
  expiresIn?: string;
};
/**
 *
 * @param {string} userId - the id of the logged in user
 * @returns the signed token
 */
const secret = process.env.JWT_SECRET as string;

export const getSignedToken = ({
  userId,
  expiresIn = '1d',
}: GetSignedTokenArgs) => {
  return jwt.sign({ id: userId }, secret, {
    expiresIn,
  });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  givenPassword: string,
  realPassword: string
) => {
  const isMatch = await bcrypt.compare(givenPassword, realPassword);
  return isMatch;
};

export const getUserIdByToken = async (req: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer'))
    return new ErrorResponse('Unauthorized', 401);

  const token = authHeader.split(' ')[1];

  if (!token) return new ErrorResponse('Unauthorized', 401);

  const decoded = jwt.verify(token, secret) as { id: string };

  const foundUser = await UserModel.findById(decoded.id);

  if (!foundUser) throw new ErrorResponse('Unauthorized', 401);
  const user = await UserModel.findById(foundUser);

  return user?.email;
};
