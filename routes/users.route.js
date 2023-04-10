const express = require('express');

const authController = require('../controllers/user.controller');
const { handleLoginError } = require('../middlewares/user.middleware');
const {
  createUserValidation,
  loginUserValidation,
} = require('../middlewares/validation.middleware');

const router = express.Router();

router.post('/signup', createUserValidation, authController.signup);
router.post(
  '/login',
  loginUserValidation,
  handleLoginError,
  authController.login
);

module.exports = router;
