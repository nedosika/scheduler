import React from 'react';
import {useHistory} from "react-router-dom";

import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";
import Layout from "../components/Layout";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import DatePicker from "@mui/lab/DatePicker";
import SaveIcon from '@mui/icons-material/Save';
import TextField from "@mui/material/TextField";
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const CreateSchedule = () => {
    const {addSchedule} = useActions();
    const history = useHistory();
    const [state, setState] = React.useState({
        title: '',
        description: '',
        date: new Date()
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = () => {
        //console.log(new Date(moment(state.date).format('YYYY-MM-DD')).getMonth());
        addSchedule({...state})
            .then(() => history.push(RouteNames.SCHEDULES))
    };

    return (
        <Layout title="Create schedule" backButton>
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
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        views={['year', 'month']}
                        label="Year and Month"
                        minDate={new Date('2012-03-01')}
                        maxDate={new Date('2023-06-01')}
                        value={state.date}
                        onChange={(newValue) => {
                            setState({...state, date: newValue});
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                helperText={null}
                                sx={{
                                    maxWidth: 300,
                                    width: '95%',
                                    marginTop: 2
                                }}
                            />}
                    />
                </LocalizationProvider>
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