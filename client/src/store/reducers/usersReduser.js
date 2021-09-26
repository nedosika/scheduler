import {UsersActionType} from "../types";

const initialState = {
    isLoading: false,
    users: [],
    error: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UsersActionType.SET_IS_USERS_LOADING:
            return {...state, isLoading: true, error: null};
        case UsersActionType.SET_USERS:
            return {...state, isLoading: false, error: null, users: action.payload};
        case UsersActionType.SET_ERROR:
            return {...state, isLoading: false, error: action.payload};
        case UsersActionType.ADD_USER:
            return {...state, isLoading: false, error: null, users: [...state.users, action.payload]};
        case UsersActionType.UPDATE_USER:
            return {
                ...state,
                isLoading: false,
                error: null,
                users: [state.users.map((user) => user.id === action.payload.id ? {...action.payload} : {...user})]
            };
        case UsersActionType.REMOVE_USER:
            return {
                ...state,
                isLoading: false,
                error: null,
                users: [...state.users.filter((user) => user.id !== action.payload)]
            }
        default: return state;
    }
}

export default usersReducer;