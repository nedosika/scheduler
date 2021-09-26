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
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";


export default function Users() {
    const {users, isLoading} = useSelector(state => state.users);
    const {fetchUsers} = useActions();
    const history = useHistory();

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Layout title="Workers">
            {isLoading
                ?
                <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                :
                <List sx={{width: '95%', margin: '0 auto', marginTop: 1, bgcolor: 'background.paper'}}>
                    {
                        users.map(({id, avatar, username, description}, index) => {
                            return (
                                <React.Fragment key={id}>
                                    <ListItemButton alignItems="flex-start" onClick={() => {
                                        history.push(`${RouteNames.EDIT_USER}/${id}`)
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp"
                                                    src={`${process.env.REACT_APP_API_URL}/${avatar}`}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={username}
                                            secondary={description}
                                        />
                                    </ListItemButton>
                                    {index < users.length - 1 && <Divider variant="inset" component="li"/>}
                                </React.Fragment>
                            );
                        })
                    }
                </List>
            }
            <Stack
                direction="row"
                spacing={2}
                alignItems="flex-end"
                justifyContent="flex-end"
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
            >
                <Fab
                    size="medium"
                    color="secondary"
                    onClick={() => history.push(RouteNames.CREATE_USER)}
                >
                    <AddIcon/>
                </Fab>
            </Stack>
        </Layout>
    );
}