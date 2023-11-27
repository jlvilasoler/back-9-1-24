import winston from "winston";
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.environment);

const config = {
    PRODUCTION: {
        transports: [
            new winston.transports.Console({
                level: 'info',
            })
        ]
    },
    DEVELOPMENT: {
        transports: [
            new winston.transports.Console({
                level: 'debug',
            })
        ]
    },
} 

export const logger = winston.createLogger(config[process.env.environment]);