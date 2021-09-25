import React from 'react';
import {useHistory} from "react-router-dom";

import Layout from "../components/Layout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";

const CreateUser = () => {
    const {addUser} = useActions((state) => state.users);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        addUser({
            username: data.get('username'),
            password: data.get('password'),
        }).then(() => history.push(RouteNames.USERS));
    };

    return (
        <Layout title="Create user">
            <Box
                component="form"
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    id="username"
                    label="username"
                    name="username"
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
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}

                >
                    Create
                </Button>
            </Box>
        </Layout>
    );
};

export default CreateUser;