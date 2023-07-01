import { ErrorRequestHandler } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

export class ErrorResponse extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    // MongoDB ObjectId casting error
    const statusCode = 400;
    const errorMessage = 'Invalid invoice ID';

    return res.status(statusCode).json({ error: errorMessage });
  }

  if (error.name === 'MongoError') {
    // MongoDB related error
    const statusCode = 500;
    const errorMessage = 'MongoDB Error';

    return res.status(statusCode).json({ error: errorMessage });
  }

  if (err instanceof JsonWebTokenError) {
    error = new ErrorResponse('Unauthorized', 401);
  }

  res.status(error.statusCode || 500).json({
    status: 'failed',
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
