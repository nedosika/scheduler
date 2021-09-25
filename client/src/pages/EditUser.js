import React from 'react';
import {useHistory, useParams} from "react-router-dom";

import Layout from "../components/Layout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";
import {useSelector} from "react-redux";

const EditUser = () => {
    const {users} = useSelector(state => state.users);
    const {updateUser} = useActions();
    const history = useHistory();
    const {id: userId} = useParams();
    console.log(users)
    const user = users.filter((user) => user.id === userId)[0];

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        updateUser({
            id: userId,
            username: data.get('username'),
            password: data.get('password'),
        }).then(() => history.push(RouteNames.USERS));
    };

    return (
        <Layout title="Edit user">
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
                    defaultValue={user.username}
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
                    Update
                </Button>
            </Box>
        </Layout>
    );
};

export default EditUser;