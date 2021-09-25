import UsersService from "../services/UserService.js";
import {validationResult} from "express-validator";

class UserController {
    async getAll(req, res) {
        try {
            const users = await UsersService.getAll();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;

            const user = await UsersService.createUser(username, password);
            res.json(user);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }

    async getOne(req, res) {
        try {
            const user = await UsersService.getUserById(req.params.id)
            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await UsersService.update(req.body);
            return res.json(updatedUser);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const user = await UsersService.remove(req.params.id);
            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController();
