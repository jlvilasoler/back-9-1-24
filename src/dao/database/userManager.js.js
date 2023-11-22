import { userModel } from "../models/user.model.js";
import { productModel } from "../models/product.model.js";

export default class UserManager {
    async getAllCarts() {
        const users = await userModel.find().lean();
        return users;
    }

    async addUser(id) {
        const newUser = await userModel.create(id);
        return newUser.id;
    }

    async getUserById(id) {
        const newUser = await userModel.findOne({ _id: id });
        return newUser;
    }


//DELETE USER
async deleteUser(id) {
    try {
    const findUser = await userModel.findById(id);
    if (findUser) {
        findUser.users  = [];
        await findUser.save();
        return findUser;
    } else {
        throw new Error("The cart you are searching for does not exist!");
    }
    } catch (error) {
    //console.log()error);
    }
}


    async getUserById(id) {
        try {
            const user = await userModelModel
                .findById(id)
                .populate("users.user")
                .lean();
            return user;
        } catch (error) {
            //console.log()error);
        }
    }


}

