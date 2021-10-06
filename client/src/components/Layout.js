import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import Box from "@mui/material/Box";

import MenuBar from "./MenuBar";
import NavBar from "./NavBar";

const Layout = ({children, title}) => {
    const [isMenuBarOpen, setIsMenuBarOpen] = React.useState(false);


    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1}}>
                <NavBar
                    title={title}
                    showMenuBar={() => setIsMenuBarOpen(true)}
                />
                <MenuBar
                    open={isMenuBarOpen}
                    handleClose={() => setIsMenuBarOpen(false)}
                />
            </Box>
            {children}
        </>
    );
}

export default Layout;