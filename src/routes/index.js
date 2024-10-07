
import express from 'express';

const v1Router = require('./v1');

const apiRouter = express.Router();

apiRouter.use('/v1',v1Router);


export default apiRouter;



