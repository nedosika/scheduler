import {AuthActionType} from "../types";

const initialState = {
    isAuth: false,
    isLoading: false,
    error: '',
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionType.LOGGING_USER:
            return {...state, isLoading: action.payload, error: ''};
        case AuthActionType.LOGGING_USER_SUCCESSFULLY:
            return {...state, user: action.payload, isAuth: true, isLoading: false, error: ''};
        case  AuthActionType.LOGGING_USER_ERROR:
            return {...state, error: action.payload, isLoading: false, isAuth: false};
        case AuthActionType.LOGOUT_USER:
            return {...state, isAuth: false, user: {}}
        default:
            return state
    }
}

export default authReducer;