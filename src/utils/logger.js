import winston from "winston";
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.environment);

const config = {
    PRODUCTION: {
        transports: [
            new winston.transports.Console({
                level: 'warn',
            })
        ]
    },
    DEVELOPMENT: {
        transports: [
            new winston.transports.Console({
                level: 'silly',
            })
        ]
    },
} 

export const logger = winston.createLogger(config[process.env.environment]);


