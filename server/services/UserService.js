import bcrypt from "bcryptjs";

import FileService from "./FileService.js";
import UserDTO from "../dtos/UserDTO.js";
import User from "../models/User.js";
import Role from "../models/Role.js";


class UserService {
    static async getAll() {
        const users = await User.find();
        return users.map((user) => new UserDTO(user));
    }

    static async getUserById(id) {
        const user = await User.findOne({_id: id});
        return new UserDTO(user);

    }

    static async getUserByName(username) {
        const user = await User.findOne({username});
        return new UserDTO(user);
    }

    static async addUser({username, password}, avatar) {
        const candidate = await User.findOne({username});

        if (candidate) {
            throw new Error("Пользователь с таким именем уже существует");
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "USER"});
        const fileName = await FileService.saveFile(avatar);

        const user = new User({
            username,
            password: hashPassword,
            avatar: fileName,
            roles: [userRole.value]
        });
        await user.save();

        return new UserDTO(user);
    }

    static async updateUser(id, user) {
        const updatedUser = await User.findOneAndUpdate(
            {_id: id},
            user, {new: true}
        );

        return new UserDTO(updatedUser);
    }

    static async removeUser(id) {
        const user = await User.findOneAndDelete({_id: id});
        console.log(user)
        return new UserDTO(user);
    }
}

export default UserService;