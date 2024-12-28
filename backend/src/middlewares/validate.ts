import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { validationMessages } from '../utils/messages'; 

// Validation rules
const assetValidationRules: ValidationChain[] = [
  body('name')
    .isString()
    .withMessage(validationMessages.name.isString)
    .notEmpty()
    .withMessage(validationMessages.name.notEmpty),
  body('value')
    .isNumeric()
    .withMessage(validationMessages.value.isNumeric)
    .notEmpty()
    .withMessage(validationMessages.value.notEmpty),
  body('currency')
    .optional() // Currency is optional
    .isString()
    .withMessage(validationMessages.currency.isString)
    .isIn(['EUR', 'USD', 'GBP', 'JPY', 'AUD']) // Allowed currencies
    .withMessage(validationMessages.currency.isIn),
];

// Middleware to check validation results
const validateResult = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

// Combine validation rules and result checker
export const validateAsset = [...assetValidationRules, validateResult];
