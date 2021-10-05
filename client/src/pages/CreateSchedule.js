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

const CreateSchedule = () => {
    const {addSchedule} = useActions();
    const history = useHistory();
    const [state, setState] = React.useState({});

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = () => {
        const {title, description} = state;

        addSchedule({title, description})
            .then(() => history.push(RouteNames.SCHEDULES))
    };

    return (
        <Layout title="Create schedule">
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
                    id="title"
                    label="title"
                    name="title"
                    value={state.title}
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
                    id="description"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    label="Description"
                    fullWidth
                    sx={{
                        maxWidth: 300,
                        width: '95%'
                    }}
                />
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

export default CreateSchedule;