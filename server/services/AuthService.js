import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import UserDTO from "../dtos/UserDTO.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "24h"})
}

export default class AuthService {
    static async login(username, password) {
        const user = await User.findOne({username});
        if (!user) {
            throw new Error(`Пользователь ${username} не найден`);
            //return res.status(400).json({message: `Пользователь ${username} не найден`})
        }
        const validPassword = await bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error(`Введен неверный пароль`);
            //return res.status(400).json({message: `Введен неверный пароль`})
        }

        const userDto = new UserDTO(user);

        const token = generateAccessToken(user._id, user.roles);
        return {token, user: userDto}
    }

    static registration(username, password) {

    }
}