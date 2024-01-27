import { Router } from "express";
import { uploader } from "../src/middlewares/multer.js";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";

const router = Router();


router.post('/', uploader.single('file'), privateRoutes,  (req, res) => {
    const image  = req.body;
    res.status(200).send();
});

export default router;  
