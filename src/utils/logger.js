import winston from "winston";
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.environment);

const config = {
    PRODUCTION: {
        transports: [
            new winston.transports.Console({
                level: 'debug',
            })
        ]
    },
    DEVELOPMENT: {
        transports: [
            new winston.transports.Console({
                filename: 'errors.log',
                level: 'error',
            })
        ]
    },
} 

const environment = process.env.environment || 'DEVELOPMENT';
export const logger = winston.createLogger(config[environment]);