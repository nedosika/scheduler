import * as React from 'react';
import AppRouter from "./components/AppRouter";
import useActions from "./hooks/useActions";

export default function ButtonAppBar() {
    const {setUser} = useActions();
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("auth"))?.user;
        console.log(user);
        if(user?.username){
            setUser({username: user?.username});
        }
    }, []);
    return (
        <AppRouter/>
    );
}
