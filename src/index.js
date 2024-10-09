
'use strict';
import express from 'express';
import bodyParser from 'body-parser';

import {PORT} from './config/server.config.js'

import apiRouter from './routes/index.js';
import errorHandler from './utils/errorHandler.js';
import connectToDB from './config/db.config.js';

const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/api",apiRouter);

app.use(errorHandler);

app.listen(PORT,async()=>{
    console.log(`Server Started at PORT: ${PORT}`);
    await connectToDB();
    console.log("Connected to MongoDB");

})