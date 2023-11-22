import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import publicRoutes from "../middlewares/publicRoutes.js";

//MUESTRA TODOS LOS USUARIOS
export const getAllUsersController = async (req, res, next) => {
    try {
        const doc = await getProductsService();
        res.json(doc);
    } catch (error) {
        next(error)
    }
}
