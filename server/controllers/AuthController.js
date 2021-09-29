import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import AuthService from "../services/AuthService.js";

class AuthController {
    static async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: "A user with the same name already exists"});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});

            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();

            return res.status(200).json({message: "User registered successfully"});
        } catch (e) {
            res.status(500).json({message: 'Registration error'});
        }
    }

    static async login(req, res) {
        try {
            const {username, password} = req.body;
            const userData  = await AuthService.login(username, password);

            res.status(200).json(userData);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }

    static async checkAuth(req, res){
        try{
            const userData = await AuthService.auth(req.user.id);

            res.status(200).json(userData);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
}

export default AuthController;
