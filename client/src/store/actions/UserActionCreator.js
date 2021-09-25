import {UsersActionType} from "../types";
import UsersService from "../../api/UsersService";

const UsersActionCreator = {
    setUsersLoading: () => {
        return {type: UsersActionType.FETCH_USERS}
    },
    setUsersError: (payload) => {
        return {type: UsersActionType.FETCH_USERS_ERROR, payload}
    },
    setUsers: (payload) => {
        return {type: UsersActionType.FETCH_USERS_SUCCESSFULLY, payload}
    },
    fetchUsers: () => async (dispatch) => {
        dispatch(UsersActionCreator.setUsersLoading());
        try {
            const response = await UsersService.fetchUsers();
            console.log(response);
            dispatch(UsersActionCreator.setUsers(response?.data))
        } catch (e) {
            dispatch(UsersActionCreator.setUsersError());
        }
    },
    addUser: ({username, password}) => async (dispatch) => {
        try {
            dispatch({type: UsersActionType.ADDING_USER});

            const response = await UsersService.addUser(username, password);

            if (response?.data) {
                dispatch({type: UsersActionType.ADDING_USER_SUCCESSFULLY, payload: response.data});
            }
        } catch (e) {
            dispatch({type: UsersActionType.ADDING_USER_ERROR, payload: e});
        }
    }
};

export default UsersActionCreator;