const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const usersRouter = require('./routes/users.route');
const transfersRouter = require('./routes/transfers.route');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tranfers', transfersRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
