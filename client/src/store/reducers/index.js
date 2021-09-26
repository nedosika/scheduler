import {combineReducers} from "redux";
import authReducer from "./authReducer";
import usersReducer from "./usersReduser"
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
});

export default rootReducer;