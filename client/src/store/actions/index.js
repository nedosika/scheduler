import AuthActionCreator from "./AuthActionCreator";
import UsersActionCreator from "./UserActionCreator";

const ActionCreator = {
    ...AuthActionCreator,
    ...UsersActionCreator
}

export default ActionCreator;