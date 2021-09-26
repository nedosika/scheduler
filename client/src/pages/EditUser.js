import React from 'react';
import {useHistory, useParams} from "react-router-dom";

import Layout from "../components/Layout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";
import {useSelector} from "react-redux";
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditUser = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [state, setState] = React.useState({
        username: '',
        password: ''
    });

    const {users} = useSelector(state => state.users);
    const {updateUser, deleteUser} = useActions();
    const history = useHistory();
    const {id} = useParams();

    React.useEffect(() => {
        const {username, password} = users.filter((user) => user.id === id)[0];
        setState({
            username,
            password
        })
    }, []);

    const handleCapture = ({target}) => {
        setSelectedFile(target.files[0]);
    };

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = () => {
        updateUser({...state, id, avatar: selectedFile})
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
                    required
                    id="username"
                    label="username"
                    name="username"
                    autoFocus
                    fullWidth
                    value={state.username}
                    onChange={handleChange}
                    sx={{
                        maxWidth: 300,
                        width: '95%'
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    fullWidth
                    value={state.password}
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
                    {selectedFile ? selectedFile.name : "Select Image"}
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