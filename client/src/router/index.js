import SignIn from "../pages/SignIn";
import Users from "../pages/Users";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";

import {RouteNames} from "../utils/consts";
import Schedules from "../pages/Schedules";

export const publicRoutes = [
    {path: RouteNames.LOGIN, component: SignIn, exact: true},
];

export const privateRoutes = [
    {path: RouteNames.USERS, component: Users, exact: true},
    {path: RouteNames.CREATE_USER, component: CreateUser, exact: true},
    {path: `${RouteNames.USERS}/:id`, component: EditUser, exact: true},
    {path: RouteNames.SCHEDULES, component: Schedules, exact: true},
    {path: RouteNames.CREATE_SCHEDULE, component: Schedules, exact: true},
    {path: `${RouteNames.SCHEDULES}/:id`, component: Schedules, exact: true},
];


