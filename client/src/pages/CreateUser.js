import React from 'react';
import {useHistory} from "react-router-dom";

import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";
import Layout from "../components/Layout";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SaveIcon from '@mui/icons-material/Save';
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

const CreateUser = () => {
    const {addUser} = useActions();
    const history = useHistory();
    const [state, setState] = React.useState({
        username: '',
        password: ''
    });
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleCapture = ({target}) => {
        setSelectedFile(target.files[0]);
    };

    const handleSubmit = () => {
        addUser({...state, avatar: selectedFile})
            .then(() => history.push(RouteNames.USERS));
    };

    return (
        <Layout title="Create user" backButton>
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
                    value={state.username}
                    onChange={handleChange}
                    autoFocus
                    fullWidth
                    sx={{
                        maxWidth: 300,
                        width: '95%'
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    label="Password"
                    type="password"
                    id="password"
                    fullWidth
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
                    color="primary"
                    onClick={handleSubmit}
                >
                    <SaveIcon/>
                </Fab>
            </Stack>
        </Layout>
    );
};

export default CreateUser;