import UserManager from "../dao/database/usersManager.js"
import UserRepository from "../repository/UserRepository.js";

const userRepository = new UserRepository();
const CM = new CartManager();

export const getUserService = async () => {
    try {
        const docs = await CM.getAllCarts();
        return docs;
    } catch (error) {
        //console.log()error);
    }
};