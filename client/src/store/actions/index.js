import AppActionCreator from "./AppActionCreator";
import AuthActionCreator from "./AuthActionCreator";
import UsersActionCreator from "./UserActionCreator";
import SchedulesActionCreator from "./SchedulesActionCreator";

const ActionCreator = {
    ...AppActionCreator,
    ...AuthActionCreator,
    ...UsersActionCreator,
    ...SchedulesActionCreator
}

export default ActionCreator;