import {AppActionType} from "../types";

const initialState = {
    isLoading: false,
    error: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case AppActionType.SET_IS_LOADING: return {...state, isLoading: action.payload};
        case AppActionType.SET_ERROR: return {...state, isLoading: false, error: action.payload};
        default: return state;
    }
};

export default appReducer;