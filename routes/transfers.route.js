const express = require('express');
const router = express.Router();

const transferController = require('../controllers/transfer.controller');
const { handleTransferError } = require('../middlewares/transfer.middleware');
const { transferValidation } = require('../middlewares/validation.middleware');

router.post(
  '/',
  transferValidation,
  handleTransferError,
  transferController.transfer
);

module.exports = router;
