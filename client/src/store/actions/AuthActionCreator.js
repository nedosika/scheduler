import {AuthActionType} from "../types";
import AuthService from "../../api/AuthService";

const AuthActionCreator = {
    setAuthLoading: () => ({type: AuthActionType.LOGGING_USER}),
    setAuthError: (payload) => ({type: AuthActionType.LOGGING_USER_ERROR, payload}),
    setUser: (payload) => ({type: AuthActionType.LOGGING_USER_SUCCESSFULLY, payload}),
    logout: () => {
        localStorage.removeItem("auth");
        return {type: AuthActionType.LOGOUT_USER}
    },
    login: ({username, password}) => async (dispatch) => {
        try {
            dispatch(AuthActionCreator.setAuthLoading());

            const response = await AuthService.login(username, password);

            if (response?.data) {
                localStorage.setItem("auth", JSON.stringify({
                    token: response?.data?.token,
                    user: {
                        username: response?.data?.user?.username
                    }
                }));
                dispatch(AuthActionCreator.setUser({username}));
            }
        } catch (e) {
            dispatch(AuthActionCreator.setAuthError(e));
        }
    },
    // checkAuth: () => async (dispatch) => {
    //     this.setLoading(true);
    //     try {
    //         const response = await axios.get(`${config.API_URL}/refresh`, {withCredentials: true})
    //         console.log(response);
    //         localStorage.setItem('token', response.data.accessToken);
    //         // this.setAuth(true);
    //         // this.setUser(response.data.user);
    //     } catch (e) {
    //         console.log(e.response?.data?.message);
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }
}

export default AuthActionCreator;