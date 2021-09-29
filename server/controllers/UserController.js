import bcrypt from "bcryptjs";

import UsersService from "../services/UserService.js";
import {validationResult} from "express-validator";
import FileService from "../services/FileService.js";

class UserController {
    async getAll(req, res) {
        try {
            const users = await UsersService.getAll();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const newUser = req.body;
            const avatar = req.files?.avatar;

            const user = await UsersService.addUser(newUser, avatar);
            res.status(201).json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const user = await UsersService.getUserById(req.params.id);

            return res.status(200).json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            if(req.body?.password){
                req.body.password = bcrypt.hashSync(req.body.password, 7);
            }

            if(req.files?.avatar){
                req.body.avatar = await FileService.saveFile(req.files?.avatar);
            }

            const user = await UsersService.updateUser(req.params.id, req.body);

            return res.status(200).json(user);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const user = await UsersService.removeUser(req.params.id);
            return res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController();
