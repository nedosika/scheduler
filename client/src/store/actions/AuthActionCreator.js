import {AuthActionType} from "../types";
import AuthService from "../../api/AuthService";
import AppActionCreator from "./AppActionCreator";

const AuthActionCreator = {
    setUser: (payload) => ({type: AuthActionType.SET_USER, payload}),
    logout: () => {
        localStorage.removeItem('auth');
        return {type: AuthActionType.UNSET_USER}
    },
    login: ({username, password}) => async (dispatch) => {
        try {
            dispatch(AppActionCreator.showLoader());
            const response = await AuthService.login(username, password);

            if (response?.data) {
                localStorage.setItem('auth', JSON.stringify({
                    token: response?.data?.token,
                    user: {
                        username: response?.data?.user?.username
                    }
                }));
                dispatch(AuthActionCreator.setUser({username}));
            }
        } catch (e) {
            alert(e.response?.data?.message);
        } finally {
            dispatch(AppActionCreator.hideLoader())
        }
    },
    checkAuth: () => async (dispatch) => {
        try {
            dispatch(AppActionCreator.showLoader());
            const response = await AuthService.checkAuth();

            if (response?.data) {
                localStorage.setItem('auth', JSON.stringify({
                    token: response?.data?.token,
                    user: {
                        username: response?.data?.user?.username
                    }
                }));
                dispatch(AuthActionCreator.setUser({username: response?.data?.user?.username}));
            }
        } catch (e) {
            localStorage.removeItem('auth');
            alert(e.response?.data?.message);
        } finally {
            dispatch(AppActionCreator.hideLoader())
        }
    }
}

export default AuthActionCreator;