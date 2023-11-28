import { Router } from "express";
import { logger } from '../src/utils/logger.js';
import { getProdFilterPaginateController } from "../src/Controllers/ProductController.js";

const router = Router();

//router de Productos y paginación:
router.get("/", /*privateRoutes,*/ async (req, res) => {
    await getProdFilterPaginateController(req, res);
    logger.info("info");
    logger.error("error");
    logger.http("http")
});



export default router;  