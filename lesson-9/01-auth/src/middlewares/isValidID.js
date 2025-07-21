import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidID(req, res, next) {
  if (isValidObjectId(req.params.id) !== true) {
    // return res.status(400).json({ status: 400, message: 'ID is not valid' });
    // return next(new createHttpError.BadRequest("ID is not valid"));
    throw createHttpError(400, 'Bad Request');
    // throw new createHttpError.BadRequest("ID is not valid")
  }

  next();
}
