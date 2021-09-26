import Router from "express";
import {check} from "express-validator";
import controller from "../controllers/AuthController.js";
import authMiddleWare from "../middlewaree/authMiddleware.js";

const router = new Router();

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: API to registration and auth your users.
 */

/**
 * @swagger
 * /registration:
 *   post:
 *     tags: [Auth]
 *     description: Registration user
 *     parameters:
 *      - name: username
 *        description: user username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: user password
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     description: Login user
 *     parameters:
 *      - name: username
 *        description: user username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: user password
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Created
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /check:
 *   post:
 *     tags: [Auth]
 *     description: Login user
 *     responses:
 *       200:
 *         description: Authenticated
 */
router.post('/check', authMiddleWare, controller.checkAuth);

export default router;
