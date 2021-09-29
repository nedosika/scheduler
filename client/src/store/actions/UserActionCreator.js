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
        UsersService.fetchUsers()
            .then(({data}) => dispatch(UsersActionCreator.setUsers(data)))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    },
    addUser: ({username, password}) => async (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        UsersService.addUser(username, password)
            .then(({data}) => dispatch({type: UsersActionType.ADD_USER, payload: data}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    },
    updateUser: ({id, username, password, avatar}) => async (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        UsersService.updateUser(id, username, password, avatar)
            .then(({data}) => dispatch({type: UsersActionType.UPDATE_USER, payload: data}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    },
    deleteUser: (id) => async (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        UsersService.deleteUser(id)
            .then(({data}) => dispatch({type: UsersActionType.REMOVE_USER, payload: data.id}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    }
};

export default UsersActionCreator;