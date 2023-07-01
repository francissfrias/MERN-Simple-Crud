import { RequestHandler, Router } from 'express';
import { ErrorResponse } from '../middlewares/errorHandler';
import UserModel from '../user/user.model';
import { comparePassword, getSignedToken } from '../utils/helpers';
import { User } from '../user/user.schema';

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorResponse('Email and password are required', 400);
    }

    // Find the user with the given email
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    const { password: encryptedPassword, ...user } =
      foundUser.toObject() as User;

    // Check the password
    const isMatch = await comparePassword(password, encryptedPassword);

    if (!isMatch) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    // Sign token
    const token = getSignedToken({ userId: foundUser.id });

    return res.status(200).json({
      status: 'success',
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();

router.post('/', login);

export default router;
