const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Password must be at least 10 characters long'),
  validFields,
];

exports.loginUserValidation = [
  body('accountNumber')
    .notEmpty()
    .withMessage('Account number cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Password must be at least 10 characters long'),
  validFields,
];

exports.transferValidation = [
  body('amount')
    .notEmpty()
    .withMessage('Amount cannot be empty')
    .isNumeric()
    .withMessage('Amount must be a number'),

  body('senderAccount')
    .notEmpty()
    .withMessage('Sender account cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Sender account must be at least 6 characters long'),

  body('receiverAccount')
    .notEmpty()
    .withMessage('Receiver account cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Receiver account must be at least 6 characters long'),

  validFields,
];
