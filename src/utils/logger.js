import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf } = format;

const myformat  = printf(({ level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`
});

export const logger = createLogger({
            format: combine(label({ label: 'right!'}),
            timestamp(), myformat),
            transports: [
                new transports.Console({
                    level: 'info',
                }),
            ],
        });



