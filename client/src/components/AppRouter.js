import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

import {RouteNames} from "../utils/consts";
import {privateRoutes, publicRoutes} from "../router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AppRouter = () => {
    const {isAuth} = useSelector(state => state.auth);
    const routes = isAuth ? privateRoutes : publicRoutes;
    const redirectPath = isAuth ? RouteNames.USERS : RouteNames.LOGIN;

    return (
        <Switch>
            {routes.map((route) =>
                <Route
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to={redirectPath}/>
        </Switch>
    );
}

export default AppRouter;