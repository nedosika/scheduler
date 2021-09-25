import {UsersActionType} from "../types";

const initialState = {
    isLoading: false,
    users: [],
    error: ''
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UsersActionType.FETCH_USERS:
            return {...state, isLoading: true, error: ''};
        case UsersActionType.FETCH_USERS_SUCCESSFULLY:
            return {...state, isLoading: false, users: action.payload, error: ''};
        case UsersActionType.FETCH_USERS_ERROR:
            return {...state, error: action.payload, isLoading: false};
        case UsersActionType.ADDING_USER:
            return {...state, isLoading: true, error: ''};
        case UsersActionType.ADDING_USER_SUCCESSFULLY:
            return {...state, isLoading: false, error: ''};
        case UsersActionType.ADDING_USER_ERROR:
            return {...state, error: action.payload, isLoading: false};
        case UsersActionType.UPDATING_USER:
            return {...state, isLoading: true, error: ''};
        case UsersActionType.UPDATING_USER_SUCCESSFULLY:
            return {...state, isLoading: false, error: ''};
        case UsersActionType.UPDATING_USER_ERROR:
            return {...state, error: action.payload, isLoading: false};
        default: return state;
    }
}

export default usersReducer;