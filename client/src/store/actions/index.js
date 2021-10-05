import AuthActionCreator from "./AuthActionCreator";
import UsersActionCreator from "./UserActionCreator";
import SchedulesActionCreator from "./SchedulesActionCreator";

const ActionCreator = {
    ...AuthActionCreator,
    ...UsersActionCreator,
    ...SchedulesActionCreator
}

export default ActionCreator;