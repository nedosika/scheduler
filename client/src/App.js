import * as React from 'react';
import AppRouter from "./components/AppRouter";
import useActions from "./hooks/useActions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {useSelector} from "react-redux";

export default function ButtonAppBar() {
    const {isLoading} = useSelector(state => state.app);
    const {checkAuth} = useActions();

    React.useEffect(() => {
        if (localStorage.getItem('auth'))
            checkAuth();
    }, []);

    return (
        isLoading
            ?
            <Backdrop sx={{color: '#fff'}} open>
                <CircularProgress color="inherit"/>
            </Backdrop>
            :
            <AppRouter/>
    );
}
