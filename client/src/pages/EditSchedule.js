import React from 'react';
import {useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

import BackButton from "../components/BackButton";
import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";
import Layout from "../components/Layout";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditSchedule = () => {
    const {id} = useParams();
    const history = useHistory();
    const {updateSchedule, deleteSchedule} = useActions();
    const schedule = useSelector(state => state.schedules.schedules.find((schedule) => schedule.id === id));

    const days = [];
    for (let i = 1; i <= 31; i++)
        days.push(i);

    const [state, setState] = React.useState({
        ...schedule
    });
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = () => {
        updateSchedule({...state})
            .then(() => {
                history.push(RouteNames.SCHEDULES)
            });
    };

    const handleDeleteUser = () => {
        deleteSchedule(id)
            .then(() => history.push(RouteNames.SCHEDULES));
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <Layout title="Edit schedule" backButton>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {
                    <Masonry columns={7} spacing={2} sx={{maxWidth: '50%'}}>
                        {days.map((item, index) => (
                            <MasonryItem key={index}>
                                <Button variant="outlined">{item}</Button>
                            </MasonryItem>
                        ))}
                    </Masonry>
                }
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

export default EditSchedule;