import Router from "express";

import authRoute from "./authRoute.js";
import usersRoute from "./usersRoute.js";

const router = new Router();

router.use('/auth', authRoute);
router.use('/users', usersRoute);

export default router;