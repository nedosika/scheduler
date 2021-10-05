import Router from "express";
import controller from "../controllers/ScheduleController.js";
import roleMiddleware from "../middlewaree/roleMiddleware.js";

const router = new Router();

/**
 * @swagger
 *  tags:
 *    name: Schedule
 *    description: API to manage yours schedule.
 */

/**
 * @swagger
 * /schedule:
 *   get:
 *     tags: [Schedule]
 *     description: Gets all the schedules
 *     responses:
 *       200:
 *         description: Returned all schedules
 */
router.get('/', roleMiddleware(["ADMIN"]), controller.getAll);

/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     tags: [Schedule]
 *     description: Gets schedule by id
 *     responses:
 *       200:
 *         description: Schedule to be found
 */
router.get('/:id', roleMiddleware(["ADMIN"]), controller.getOne);

/**
 * @swagger
 * /schedules:
 *   post:
 *     tags: [Schedule]
 *     description: Creates a new schedule
 *     parameters:
 *      - name: title
 *        description: schedule title
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        description: schedule description
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Schedule to be added
 *       403:
 *         description: Schedule already exists
 *       500:
 *         description: Server error
 */
router.post('/', roleMiddleware(["ADMIN"]), controller.create);

/**
 * @swagger
 * /schedules/{id}:
 *   put:
 *     tags: [Schedule]
 *     description: Updates a schedule
 *     parameters:
 *      - name: title
 *        description: schedule title
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        description: schedule description
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: schedule updated successfully
 *       404:
 *         description: schedule not found
 *       500:
 *         description: Server error
 */
router.put('/:id', roleMiddleware(["ADMIN"]), controller.update);

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     tags: [Schedule]
 *     description: Deletes a schedule by id
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 */
router.delete('/:id', roleMiddleware(["ADMIN"]), controller.delete);

export default router;