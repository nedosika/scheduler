import * as React from "react";
import {useHistory, useLocation} from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import useActions from "../hooks/useActions";
import getMenuItems from "../config/menuItems";


import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import {AccountCircle} from "@mui/icons-material";
import Drawer from "@mui/material/Drawer/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import {alpha, styled} from "@mui/material";
import InputBase from "@mui/material/InputBase/InputBase";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Layout = ({children, title}) => {
    const [open, setOpen] = React.useState(false);
    const {logout} = useActions();
    const menuItems = getMenuItems();
    const history = useHistory();
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{mr: 2}}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {title}
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                            />
                        </Search>

                        <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                            <IconButton size="large" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                //onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={handleDrawerClose}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: 12
                    }}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <Box sx={{width: 240}}>
                        <List>
                            {menuItems.map(({primaryText, leftIcon, value}) => (
                                <ListItem
                                    button
                                    selected={value.split('/')[1] === location.pathname.split('/')[1]}
                                    key={primaryText}
                                    onClick={() => history.push(value)}
                                >
                                    <ListItemIcon>
                                        {leftIcon}
                                    </ListItemIcon>
                                    <ListItemText primary={primaryText}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button onClick={logout}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="LogOut"/>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </Box>
            {children}
        </>
    );
}

export default Layout;