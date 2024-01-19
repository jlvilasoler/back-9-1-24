import winston from "winston";
import * as dotenv from 'dotenv';
import 'winston-daily-rotate-file';  // Necesario para el transporte diario
import 'colors';  // Agregamos el módulo colors

dotenv.config();

const levels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};

// Configuramos los colores para los niveles
winston.addColors({
    debug: 'blue',
    http: 'green',
    info: 'cyan',
    warning: 'yellow',
    error: 'red',
    fatal: 'magenta',
});

const config = {
    levels,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    PRODUCTION: {
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.cli(),
            }),
            new winston.transports.DailyRotateFile({
                filename: 'errors.log',
                datePattern: 'YYYY-MM-DD',
                level: 'error',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
            }),
        ]
    },
    DEVELOPMENT: {
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.cli(),
            }),
            new winston.transports.File({
                filename: 'errors.log',
                level: 'error',
            }),
        ]
    },
};

const environment = process.env.environment || 'DEVELOPMENT';
export const logger = winston.createLogger(config[environment]);