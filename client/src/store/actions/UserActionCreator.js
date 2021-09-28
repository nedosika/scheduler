import {UsersActionType} from "../types";
import UsersService from "../../api/UsersService";

const UsersActionCreator = {
    showLoader: () => {
        return {type: UsersActionType.SET_IS_USERS_LOADING, payload: true}
    },
    hideLoader: () => {
        return {type: UsersActionType.SET_IS_USERS_LOADING, payload: false}
    },
    setError: (payload) => {
        return {type: UsersActionType.SET_USER_ERROR, payload}
    },
    setUsers: (payload) => {
        return {type: UsersActionType.SET_USERS, payload}
    },
    fetchUsers: () => async (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        try {
            const response = await UsersService.fetchUsers();
            setTimeout(() => {
                dispatch(UsersActionCreator.setUsers(response?.data));
            }, 1000);
        } catch (e) {
            dispatch(UsersActionCreator.setError(e));
        }
    },
    addUser: ({username, password, avatar}) => async (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        try {
            const response = await UsersService.addUser(username, password, avatar);

            if (response?.data) {
                dispatch({type: UsersActionType.ADD_USER, payload: response?.data});
            }
        } catch (e) {
            dispatch(UsersActionCreator.setError(e));
        }
    },
    updateUser: ({id, username, password, avatar}) => async (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        try {
            const response = await UsersService.updateUser(id, username, password, avatar);
            if (response?.data) {
                const updatedUser = {...response.data};
                dispatch({type: UsersActionType.UPDATE_USER, payload: updatedUser});
            }
        } catch (e) {
            dispatch(UsersActionCreator.setError(e));
        }
    },
    deleteUser: (id) => async (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        try {
            const response = await UsersService.deleteUser(id);

            if (response?.data) {
                dispatch({type: UsersActionType.REMOVE_USER, payload: id});
            }
        } catch (e) {
            dispatch(UsersActionCreator.setError(e));
        }
    }
};

export default UsersActionCreator;