const User = require('../models/user.model');
const Transfer = require('../models/transfer.model');

const catchAsync = require('../utils/catchAsync');

exports.transfer = catchAsync(async (req, res) => {
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

  const parseAmount = parseInt(amount);

  await senderUser.update({ amount: senderUser.amount - parseAmount });
  await receiverUser.update({ amount: receiverUser.amount + parseAmount });

  await Transfer.create({
    amount,
    senderUserId: senderUser.id,
    receiveUserId: receiverUser.id,
  });

  res.status(201).json({
    status: 'Success',
    message: 'Successful Transfer',
  });
});
