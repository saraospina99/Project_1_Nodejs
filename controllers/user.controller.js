const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.create({
    name,
    password,
  });

  res.status(201).json({
    status: 'success',
    message: 'So great, user created succesfully',
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });

  if (!user)
    return res.status(404).json({
      status: 'error',
      message: `Invalid password or account number`,
    });

  res.status(201).json({
    status: 'success',
    message: 'Login successfully',
  });
});
