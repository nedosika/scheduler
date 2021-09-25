import User from "../models/User.js";
import UserDTO from "../dtos/UserDTO.js";
import bcrypt from "bcryptjs";
import Role from "../models/Role.js";

class UserService {
    static async getAll() {
        try {
            const users = await User.find();
            return users.map((user) => new UserDTO(user));
        } catch (e) {
            console.log(e)
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findOne({_id: id});
            return new UserDTO(user);
        } catch (e) {
            console.log(e)
        }
    }

    static async getUserByName(username) {
        try {
            console.log("ss", username)
            const user = await User.findOne({username});
            return new UserDTO(user);
        } catch (e) {
            console.log(e)
        }
    }

    static async createUser(username, password) {
        const candidate = await User.findOne({username});

        if (candidate) {
            throw new Error("Пользователь с таким именем уже существует");
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "USER"});

        const user = new User({username, password: hashPassword, roles: [userRole.value]});
        await user.save();

        return user;
    }
}

export default UserService;