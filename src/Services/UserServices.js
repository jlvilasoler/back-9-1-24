import UserManager from "../dao/database/userManager.js";
import UserRepository from "../repository/UserRepository.js";

const userRepository = new UserRepository();

// GET ALL _ funciona
export const getAllUsersService = async () => {
    try {
        const users = await userRepository.getUserRepository();
        return users;
    } catch (error) {
        console.log(error);
    }
};

//FILTER USER BY ID _ funciona
export const getUserByIdService = async (pid) => {
    try {
        const user = await userRepository.getUserByIdRepository({ _id: pid });
        return user;
    } catch (error) {
        console.log(error);
    }
};

//DELETE USER BY ID _ funciona
export const deleteUserService = async (uid) => {
    try {
        const user = await userRepository.deleteRepository({ _id: uid });
        return user;
    } catch (error) {
        console.log(error);
    }
};