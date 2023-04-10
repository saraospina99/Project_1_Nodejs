const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.handleLoginError = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const validAccountNumber = await User.findOne({
    where: {
      accountNumber: accountNumber,
    },
  });

  if (!validAccountNumber) {
    return next(new AppError('Incorrect Account', 401));
  }

  const validPassword = await User.findOne({
    where: {
      accountNumber: accountNumber,
      password: password,
    },
  });

  if (!validPassword) {
    return next(new AppError('Incorrect Password', 401));
  }

  req.validPassword = validPassword;
  req.validAccountNumber = validAccountNumber;
  next();
});
