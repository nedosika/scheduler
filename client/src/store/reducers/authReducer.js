import {AuthActionType} from "../types";

const initialState = {
    isAuth: false,
    currentUser: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionType.SET_USER: return {...state, currentUser: action.payload, isAuth: true};
        case  AuthActionType.UNSET_USER: return {...state, currentUser: {}, isAuth: false};
        default: return state
    }
};

export default authReducer;