import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import NavBar from "./NavBar";

const Layout = ({children, title}) =>
    <>
        <CssBaseline/>
        <NavBar title={title}/>
        {children}
    </>

export default Layout;