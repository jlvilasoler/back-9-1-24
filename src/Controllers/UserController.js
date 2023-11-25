import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
//import privateRoutes from "../middlewares/privateRoutes.js";
//import publicRoutes from "../middlewares/publicRoutes.js";
import { getAllUsersService, getUserByIdService, deleteUserService  } from "../Services/UserServices.js";

//MUESTRA TODOS LOS USUARIOS
export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        res.json(users);
    } catch (error) {
        next(error)
    }
}

//FILTER BY ID _ funciona
export const getUserByIdController = async (req, res, next) => {
    try {
        const { uid } = req.params;
       const user = await getUserByIdService(uid);
       if (user) {
        res.send(user)
    } else {
        res.status(404).send();
    }
    } catch (error) {
        res.status(500).send("error filtering product");
        next(error)
    }
}

//DELETE USER BY ID _ funciona
export const deleteController = async (req, res, next) => {
    try {
        const { uid } = req.params;
       const user =  await deleteUserService(uid);
        if (user) {
            res.send(user)
        } else {
            res.status(404).send();
        }
        } catch (error) {
            res.status(500).send("error deleting product");
            next(error)
        }
    }
