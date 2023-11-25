import { userModel } from "../dao/models/user.model.js";


export default class UserRepository {

    // GET ALL _ funciona
    async getUserRepository() {
        try {
            const users = await userModel.find().lean();
            return users;
        } catch (error) {
            console.error("error getting users", error);
            throw error;
        }
    }

    //FILTER BY ID _ funciona
    async getUserByIdRepository(pid) {
        try {
            const user = await userModel.findOne(pid).lean();
            return user;
        } catch (error) {
            console.error("error filtering users", error);
            throw error;
        }
    }

    //DELETE USER BY ID _ funciona
    async deleteRepository(uid) {
        try {
            const user = await userModel.deleteOne({ _id: uid });
            return user;
        } catch (error) {
            console.error("error deleting user", error);
            throw error;
        }
    }

}