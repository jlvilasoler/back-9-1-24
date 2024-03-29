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

    async addUser(uid) {
        const newUser = await userModel.create(uid);
        return newUser.uid;
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


    async loginUser(email) {
        const user = await userModel.findOne({email})
        if(user) {
            user.last_connection = [{action: "login", date: new Date()}]
            await user.save()
            return user
        }
        return null
    }


}

