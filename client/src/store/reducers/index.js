import {combineReducers} from "redux";

import appReducer from "./appReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReduser"
import schedulesReducer from "./schedulesReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
    schedules: schedulesReducer
});

export default rootReducer;