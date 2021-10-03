import {UsersActionType} from "../types";
import UsersService from "../../api/UsersService";

const UsersActionCreator = {
    setIsUsersLoader: (payload) => {
        return {type: UsersActionType.SET_IS_USERS_LOADING, payload}
    },
    setError: (payload) => {
        return {type: UsersActionType.SET_USER_ERROR, payload}
    },
    setUsers: (payload) => {
        return {type: UsersActionType.SET_USERS, payload}
    },
    getUsers: () => (dispatch) => {
        dispatch(UsersActionCreator.setIsUsersLoader(true));
        return UsersService.fetchUsers()
            .then((response) => dispatch(UsersActionCreator.setUsers(response?.data)))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    },
    addUser: ({username, password}) => (dispatch) => {
        dispatch(UsersActionCreator.setIsUsersLoader(true));
        return UsersService.addUser(username, password)
            .then(({data}) => dispatch({type: UsersActionType.ADD_USER, payload: data}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    },
    updateUser: ({id, username, password, avatar}) => (dispatch) => {
        dispatch(UsersActionCreator.setIsUsersLoader(true));
        return UsersService.updateUser(id, username, password, avatar)
            .then(({data}) => dispatch({type: UsersActionType.UPDATE_USER, payload: data}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    },
    deleteUser: (id) => (dispatch) => {
        dispatch(UsersActionCreator.setIsUsersLoader(true));
        return UsersService.deleteUser(id)
            .then(({data}) => dispatch({type: UsersActionType.REMOVE_USER, payload: data.id}))
            .catch((e) => dispatch(UsersActionCreator.setError(e)))
    }
};

export default UsersActionCreator;