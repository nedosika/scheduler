import React from "react";

import {Switch} from "react-router-dom";

import {routes} from "../router";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
    return (
        <Switch>
            {
                routes.map((route) => route.private
                    ? <PrivateRoute {...route} key={route.path} />
                    : <PublicRoute {...route} key={route.path} />
                )
            }
        </Switch>
    );
};

export default AppRouter;