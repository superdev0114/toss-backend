import * as Joi from 'joi';
import * as Validation from 'express-joi-validation';
import { Request, Response, NextFunction } from 'express';

export const V = Validation.createValidator({ passError: true });

export const RetrunValidation = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error && error.error && error.value && error.type) {
    return res.status(400).json(error.error.toString().replace('Error: ', ''));
  } else {
    return next(error);
  }
};

export const Validator = {
  ObjectId: Joi.object({
    id: Joi.string().min(24).max(24).required()
  }),
  UserId: Joi.object({
    userId: Joi.string().min(24).max(24).required()
  }),
  AccountId: Joi.object({
    accountId: Joi.string().required()
  }),
  Token: {
    Get: Joi.object({
      accountId: Joi.string().required(),
    })
  },
  Balance: {
    Withdraw: Joi.object({
      accountId: Joi.string().required(),
      amount: Joi.number().required(),
      token: Joi.string().required(),
    }),
  }

};
