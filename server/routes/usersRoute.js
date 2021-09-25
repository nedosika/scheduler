import Router from "express";
import controller from "../controllers/UserController.js";
import roleMiddleware from "../middlewaree/roleMiddleware.js";

const router = new Router();

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: API to manage yours users.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     description: Gets all the users
 *     responses:
 *       200:
 *         description: Returned all users
 */
router.get('/', roleMiddleware(["ADMIN"]), controller.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     description: Gets user by id
 *     responses:
 *       200:
 *         description: User to be found
 */
router.get('/:id', roleMiddleware(["ADMIN"]), controller.getOne);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     description: Creates a new user
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
 *      - name: firstname
 *        description: firstname of user
 *        in: formData
 *        type: string
 *      - name: secondname
 *        description: secondname of user
 *        in: formData
 *        type: string
 *      - name: surname
 *        description: surname of user
 *        in: formData
 *        type: string
 *      - name: description
 *        description: description of user
 *        in: formData
 *        type: string
 *      - name: avatar
 *        description: user avatar
 *        in: formData
 *        type: file
 *     responses:
 *       200:
 *         description: User to be added
 *       403:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/', roleMiddleware(["ADMIN"]), controller.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     description: Updates a user
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
 *      - name: firstname
 *        description: firstname of user
 *        in: formData
 *        type: string
 *      - name: secondname
 *        description: secondname of user
 *        in: formData
 *        type: string
 *      - name: surname
 *        description: surname of user
 *        in: formData
 *        type: string
 *      - name: description
 *        description: description of user
 *        in: formData
 *        type: string
 *      - name: avatar
 *        description: user avatar
 *        in: formData
 *        type: file
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/', roleMiddleware(["ADMIN"]), controller.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     description: Deletes a user by id
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/', roleMiddleware(["ADMIN"]), controller.delete);

export default router;