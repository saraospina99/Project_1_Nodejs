const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.handleTransferError = catchAsync(async (req, res, next) => {
  const { amount, senderAccount, receiverAccount } = req.body;

  const senderUser = await User.findOne({
    where: {
      accountNumber: senderAccount,
    },
  });
  const receiverUser = await User.findOne({
    where: {
      accountNumber: receiverAccount,
    },
  });

  if (!senderUser) {
    return next(new AppError('Account number not exist', 404));
  }

  if (!receiverUser) {
    return next(new AppError('Destination account not exist', 404));
  }

  if (senderUser.accountNumber === receiverUser.accountNumber) {
    return next(
      new AppError(
        'The output account cannot be the same as the destination account',
        404
      )
    );
  }

  if (senderUser.amount < amount) {
    return next(new AppError('Not enough money', 400));
  }

  req.senderUser = senderUser;
  req.receiverUser = receiverUser;
  req.transferAmount = amount;
  next();
});
