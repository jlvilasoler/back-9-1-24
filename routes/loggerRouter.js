import { Router } from "express";
import { logger } from '../src/utils/logger.js';
import { getProdFilterPaginateController } from "../src/Controllers/ProductController.js";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";

const router = Router();

//router de Productos y paginación:
router.get("/", privateRoutes, async (req, res) => {
    await getProdFilterPaginateController(req, res);
    logger.debug("debug");
    logger.info("info");
    logger.warn("warning");
    logger.error("error");
});

export default router;