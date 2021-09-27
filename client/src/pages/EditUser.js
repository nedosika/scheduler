import React from 'react';
import {useHistory, useParams} from "react-router-dom";

import Layout from "../components/Layout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";
import Fab from "@mui/material/Fab";
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Stack from "@mui/material/Stack";
import Slide from '@mui/material/Slide';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import UserService from "../api/UsersService"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const EditUser = () => {
    const {id} = useParams();
    const history = useHistory();
    const {updateUser, deleteUser} = useActions();

    const [state, setState] = React.useState({
        username: '',
        password: '',
        retriedPassword: '',
    });
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    React.useEffect(() => {
        UserService.getOneUser(id).then((response) => {
            setState((prevState) => ({
                ...prevState,
                ...response.data,
                avatar: null
            }));
        })
    }, [id]);

    const handleCapture = ({target}) => {
        setState({...state, avatar: target.files[0]});
    };

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = () => {
        updateUser({...state})
            .then(() => history.push(RouteNames.USERS));
    };

    const handleDeleteUser = () => {
        deleteUser(id)
            .then(() => history.push(RouteNames.USERS));
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <Layout title="Edit user">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TextField
                    margin="normal"
                    id="username"
                    label="username"
                    name="username"
                    autoFocus
                    fullWidth
                    value={state.username || ''}
                    onChange={handleChange}
                    sx={{
                        maxWidth: 300,
                        width: '95%'
                    }}
                />
                <TextField
                    margin="normal"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    fullWidth
                    value={state.password || ''}
                    onChange={handleChange}
                    sx={{
                        maxWidth: 300,
                        width: '95%'
                    }}
                />
                <TextField
                    margin="normal"
                    name="retriedPassword"
                    label="retriedPassword"
                    type="retriedPassword"
                    id="retriedPassword"
                    fullWidth
                    value={state.retriedPassword || ''}
                    onChange={handleChange}
                    sx={{
                        maxWidth: 300,
                        width: '95%'
                    }}
                />
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        marginTop: 2
                    }}
                >
                    {state.avatar ? state.avatar.name : "Select Image"}
                    <input
                        type="file"
                        hidden
                        onChange={handleCapture}
                    />
                </Button>
            </Box>
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
                    onClick={() => setIsDeleteDialogOpen(true)}
                >
                    <DeleteOutlineIcon/>
                </Fab>
                <Fab
                    size="medium"
                    color="primary"
                    onClick={handleSubmit}
                >
                    <SaveIcon/>
                </Fab>
            </Stack>
            <Dialog
                open={isDeleteDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>{"Question dialog"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
                    <Button onClick={handleDeleteUser}>Agree</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default EditUser;