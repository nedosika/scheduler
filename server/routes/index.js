import Router from "express";

import authRoute from "./authRoute.js";
import usersRoute from "./usersRoute.js";
import schedulesRoute from "./schedulesRoute.js";

const router = new Router();

router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/schedules', schedulesRoute);

export default router;