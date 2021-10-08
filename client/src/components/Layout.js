import * as React from "react";
import {useState} from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";

import NavBar from "./NavBar";
import MenuBar from "./MenuBar";
import getMenuItems from "../config/menuItems";
import useActions from "../hooks/useActions";

const Layout = ({children, title, backButton}) => {
    const {logout} = useActions();
    const menuItems = getMenuItems();

    const [isOpenMenuBar, setIsOpenMenuBar] = useState(false);

    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1}}>
                <NavBar
                    title={title}
                    backButton={backButton}
                    showMenuBar={() => setIsOpenMenuBar(true)}
                    logout={logout}
                />
            </Box>
            <Box sx={{marginTop: 10}}>
                {children}
            </Box>
            <MenuBar
                items={menuItems}
                isOpen={isOpenMenuBar}
                hide={() => setIsOpenMenuBar(false)}
            />
        </>
    );
}

export default Layout;