import SignIn from "../pages/SignIn";
import Users from "../pages/Users";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";

import {RouteNames} from "../utils/consts";
import Schedules from "../pages/Schedules";
import CreateSchedule from "../pages/CreateSchedule";

// export const publicRoutes = [
//     {path: RouteNames.LOGIN, component: SignIn, exact: true},
// ];
//
// export const privateRoutes = [
//     {path: RouteNames.USERS, component: Users, exact: true},
//     {path: RouteNames.CREATE_USER, component: CreateUser, exact: true},
//     {path: `${RouteNames.USERS}/:id`, component: EditUser, exact: true},
//     {path: RouteNames.SCHEDULES, component: Schedules, exact: true},
//     {path: RouteNames.CREATE_SCHEDULE, component: Schedules, exact: true},
//     {path: `${RouteNames.SCHEDULES}/:id`, component: Schedules, exact: true},
// ];

export const routes = [
    {path: RouteNames.LOGIN, component: SignIn, exact: true},
    {path: RouteNames.HOME, component: SignIn, exact: true},
    {path: RouteNames.USERS, component: Users, exact: true, private: true},
    {path: RouteNames.CREATE_USER, component: CreateUser, exact: true, private: true},
    {path: `${RouteNames.USERS}/:id`, component: EditUser, exact: true, private: true},
    {path: RouteNames.SCHEDULES, component: Schedules, exact: true, private: true},
    {path: RouteNames.CREATE_SCHEDULE, component: CreateSchedule, exact: true, private: true},
    {path: `${RouteNames.SCHEDULES}/:id`, component: Schedules, exact: true, private: true},
]

