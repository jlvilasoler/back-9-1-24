import { logger } from '../utils/logger.js';

export const errors = async (req, res, next) => {
    logger.debug(`${req.method} en ${req.url}`);
    logger.http(`${req.method} en ${req.url}`);
    logger.info(`${req.method} en ${req.url}`);
    logger.warn(`${req.method} en ${req.url}`);
    logger.error(`${req.method} en ${req.url}`);
    
    try {
        await next();
    } catch (error) {
    logger.error(error);
    }
};