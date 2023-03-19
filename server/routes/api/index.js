const apiRouter = require('express').Router();
const userRouter = require('./user-routes');

apiRouter.use('/users', userRouter);

module.exports = apiRouter;