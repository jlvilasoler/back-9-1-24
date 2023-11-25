import { userModel } from "../models/user.model.js";


export default class UserManager {


    // GET ALL USERS _ funciona
    async getUsers() {
        try {
            const users = await userModel.find({}).lean();
            if (users) {
                res.send(users)
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send("error getting products");
            next(error)
        }
    }

    //FILTER BY ID _ funciona
    async getUserById(id) {
        const newUser = await userModel.findOne({ _id: id });
        return newUser;
    }



    async addUser(id) {
        const newUser = await userModel.create(id);
        return newUser.id;
    }




    //DELETE USER
    async deleteUser(id) {
        try {
            const findUser = await userModel.findById(id);
            if (findUser) {
                findUser.users = [];
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

