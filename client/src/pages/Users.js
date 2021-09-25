import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';

import useActions from "../hooks/useActions";
import Layout from "../components/Layout";
import {RouteNames} from "../utils/consts";


export default function Users() {
    const {users} = useSelector(state => state.users);
    const {fetchUsers} = useActions();
    const history = useHistory();

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Layout title="Workers">
            <List sx={{width: '95%', margin: '0 auto', marginTop: 1, bgcolor: 'background.paper'}}>
                {
                    users.map(({avatar, username, description}, key) => {
                        return (
                            <React.Fragment key={username}>
                                <ListItemButton alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={avatar}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={username}
                                        secondary={description}
                                    />
                                </ListItemButton>
                                {key < users.length - 1 && <Divider variant="inset" component="li"/>}
                            </React.Fragment>
                        );
                    })
                }
            </List>
            <Fab
                size="medium"
                color="secondary"
                onClick={() => history.push(RouteNames.CREATE_USER)}
                style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
            >
                <AddIcon/>
            </Fab>
        </Layout>
    );
}