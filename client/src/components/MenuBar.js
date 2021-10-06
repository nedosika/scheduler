import * as React from "react";
import {useHistory} from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import useActions from "../hooks/useActions";

const MenuBar = ({items, isOpen, hide, logout}) => {
    const history = useHistory();

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={hide}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: 12
            }}>
                <IconButton onClick={hide}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <Box sx={{width: 240}}>
                <List>
                    {items.map(({primaryText, leftIcon, value}) => (
                        <ListItem
                            button
                            selected={value.split('/')[1] === history.location.pathname.split('/')[1]}
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
    );
}

export default MenuBar;