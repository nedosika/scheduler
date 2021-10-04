import React from 'react';

import {RouteNames} from "../utils/consts";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const PublicRoute = ({component: Component, ...rest}) => {
    const {isAuth} = useSelector(state => state.auth);

    return !isAuth
        ? <Route {...rest} render={(props) => <Component {...props}/>}/>
        : <Redirect to={RouteNames.USERS} />
};

export default PublicRoute;