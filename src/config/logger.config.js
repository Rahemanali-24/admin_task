import winston from 'winston';

import { LOG_DB_URL } from './server.config.js';
import 'winston-mongodb';

const allowedTransports = [];

//1 the below transport configuration enables logging on the console
allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // Second argument to the combine method, which defines what is exactly going to be printed in log
        winston.format.printf((log) => `${log.timestamp} [${log.level}]: ${log.message}`)
    )
}));
//2 the below transport configuration enables logging on the mongodb database
allowedTransports.push(new winston.transports.MongoDB({
    level:"error",
    db:LOG_DB_URL,
    collection:'logs',
}));

//3 the below transport configuration enables logging on the file
allowedTransports.push(new winston.transports.File({
    filename: `app.log`,
}));


const logger = winston.createLogger({
    // default formatting   

    format: winston.format.combine(
        // The timestamp is added as a custom property of the log object
        
        winston.format.errors({stack:true}),
        // First argument to the combine method is defining how we want the timestamp to come up
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // Second argument to the combine method, which defines what is exactly going to be printed in log
        winston.format.printf((log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message} : ${log.stack}`)
    ),
    transports: allowedTransports
});


export default logger;