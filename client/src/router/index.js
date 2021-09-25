import SignIn from "../pages/SignIn";
import Users from "../pages/Users";
import {RouteNames} from "../utils/consts";
import CreateUser from "../pages/CreateUser";

export const publicRoutes = [
    {path: RouteNames.LOGIN, component: SignIn, exact: true},
];

export const privateRoutes = [
    {path: RouteNames.USERS, component: Users, exact: true},
    {path: RouteNames.CREATE_USER, component: CreateUser, exact: true},
];


