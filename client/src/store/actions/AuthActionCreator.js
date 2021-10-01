import {AuthActionType} from "../types";
import AuthService from "../../api/AuthService";
import AppActionCreator from "./AppActionCreator";

const AuthActionCreator = {
    setUser: (payload) => ({type: AuthActionType.SET_USER, payload}),
    logout: () => {
        localStorage.removeItem('auth');
        return {type: AuthActionType.UNSET_USER}
    },
    login: ({username, password}) => (dispatch) => {
        dispatch(AppActionCreator.showLoader());
        return AuthService.login(username, password)
            .then((response) => {
                    if (response?.data) {
                        localStorage.setItem('auth', JSON.stringify({
                            token: response?.data?.token,
                            user: {
                                username: response?.data?.user?.username
                            }
                        }));
                        dispatch(AuthActionCreator.setUser({username}));
                    }
            })
            .catch((e) => dispatch(AppActionCreator.showError(e)))
            .finally(() => dispatch(AppActionCreator.hideLoader()))
    },
    checkAuth: () => async (dispatch) => {
        dispatch(AppActionCreator.showLoader());

        AuthService.checkAuth()
            .then((response) => {
                if (response?.data) {
                    localStorage.setItem('auth', JSON.stringify({
                        token: response?.data?.token,
                        user: {
                            username: response?.data?.user?.username
                        }
                    }));
                    dispatch(AuthActionCreator.setUser({username: response?.data?.user?.username}));
                }
            })
            .catch((e) => {
                console.log(e.response?.data?.message);
                localStorage.removeItem('auth');
            })
            .finally(() => dispatch(AppActionCreator.hideLoader()))
    }
};

export default AuthActionCreator;