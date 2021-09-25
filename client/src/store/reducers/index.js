import {combineReducers} from "redux";
import authReducer from "./authReducer";
import usersReducer from "./usersReduser"

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer
});

export default rootReducer;