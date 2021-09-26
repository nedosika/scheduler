import {AppActionType} from "../types";

const AppActionCreator = {
    showLoader: () => ({type: AppActionType.SET_IS_LOADING, payload: true}),
    hideLoader: () => ({type: AppActionType.SET_IS_LOADING, payload: false}),
    showError: (error) => ({type: AppActionType.SET_ERROR, payload: error}),
    hideError: () => ({type: AppActionType.SET_IS_LOADING, payload: null})
};

export default AppActionCreator;