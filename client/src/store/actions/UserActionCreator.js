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
    fetchUsers: () => (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        return UsersService.fetchUsers()
            .then((response) => dispatch(UsersActionCreator.setUsers(response?.data)))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
            .finally(() => dispatch(UsersActionCreator.hideLoader()))
    },
    addUser: ({username, password}) => (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        return UsersService.addUser(username, password)
            .then(({data}) => dispatch({type: UsersActionType.ADD_USER, payload: data}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
            .finally(() => dispatch(UsersActionCreator.hideLoader()))
    },
    updateUser: ({id, username, password, avatar}) => (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        return UsersService.updateUser(id, username, password, avatar)
            .then(({data}) => dispatch({type: UsersActionType.UPDATE_USER, payload: data}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
            .finally(() => dispatch(UsersActionCreator.hideLoader()))
    },
    deleteUser: (id) => (dispatch) => {
        dispatch(UsersActionCreator.showLoader());
        return UsersService.deleteUser(id)
            .then(({data}) => dispatch({type: UsersActionType.REMOVE_USER, payload: data.id}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
            .finally(() => dispatch(UsersActionCreator.hideLoader()))
    }
};

export default UsersActionCreator;