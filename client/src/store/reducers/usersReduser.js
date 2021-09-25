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
        default: return state;
    }
}

export default usersReducer;