import React from 'react';
import {useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TableRow from '@mui/material/TableRow';
import SaveIcon from '@mui/icons-material/Save';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TableContainer from '@mui/material/TableContainer';
import DialogContentText from "@mui/material/DialogContentText";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Layout from "../components/Layout";
import {RouteNames} from "../utils/consts";
import useActions from "../hooks/useActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditSchedule = () => {
    const {id} = useParams();
    const history = useHistory();
    const {deleteSchedule} = useActions();
    const {users} = useSelector(state => state.users);
    const schedule = useSelector(state => state.schedules.schedules.find((schedule) => schedule.id === id));

    const today = new Date();
    const month = today.getMonth();

    const getNumberDaysOfMonth = (month, year) => new Date(year, month, 0).getDate();
    const numberDaysOfMonth = getNumberDaysOfMonth(month + 1, today.getFullYear());

    const days = [];
    for (let i = 1; i <= numberDaysOfMonth; i++)
        days.push(i);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    const handleDeleteSchedule = () => {
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
                    justifyContent: 'center',
                }}
            >
                {
                    <TableContainer component={Paper} sx={{width: "95%"}}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    {
                                        days.map((item) =>
                                            <TableCell align="center">{item}</TableCell>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    users.map((user) =>
                                        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                            <TableCell component="th" scope="row">
                                                {user.username}
                                            </TableCell>
                                            {
                                                days.map((item) =>
                                                    <TableCell align="center" key={item}>
                                                        <IconButton size="small">
                                                            <AlarmIcon fontSize="inherit"/>
                                                        </IconButton>
                                                    </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                    <Button onClick={handleDeleteSchedule}>Agree</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default EditSchedule;